const express = require("express");
const database = require("../DataBaseConnection");
const router = express.Router();

async function reloadMainPage(res) {
    const data = {
        pastesList : []
    }
    const pastes = await database.getAllPastes();
    for (let i = 0; i < pastes.length; ++i) {
        data.pastesList.push(pastes[i]);
    }
    res.render("index", data);
}

router.post("/:id/editing", async (req, res) => {
    try {
        await database.updatePaste(req.params.id, req.body.content);
        reloadMainPage(res);
    } catch(err) {
        console.error(err);
    }
});

router.post("/:id/deletion", async (req, res) => {
    try {
        await database.deletePaste(req.params.id);
        reloadMainPage(res);
    } catch(err) {
        res.status(404);
    }
});

router.get("/:id", async (req, res) => {
    const extractedMessage = await database.getPasteById(req.params['id']);
    const fullMessage = {
        message : extractedMessage,
        messageId : req.params['id']
    }
    res.render("fullMessage", fullMessage);
});

router.post("/content", async (req, res) => {
    database.addPasteIntoTheDataBase(req.body.content);
    reloadMainPage(res);
});



module.exports = router;