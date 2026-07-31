const express = require("express");
const database = require("../helpers/db");
const router = express.Router();
const data = {
    pastesList : []
}
let loaded = false;

async function loadMainPage() {
    const pastes = await database.getAllPastes();
    for (let i = 0; i < pastes.length; ++i) {
        data.pastesList.push(pastes[i]);
    }
}

router.get("/main_page", async (req, res) => {
    if (!loaded) {
        await loadMainPage();
        loaded = true;
    }
    res.render("fullList/index", data);
});

router.post("/:id/edit", async (req, res) => {
    try {
        await database.updatePaste(req.params.id, req.body.content);
        for (let i = 0; i < data.pastesList.length; ++i) {
            if (data.pastesList[i].id === req.params.id) {
                data.pastesList[i].content = req.body.content;
                break;
            }
        }
        res.redirect("/paste/main_page");
    } catch(err) {
        console.error(err);
    }
});

router.post("/:id/delete", async (req, res) => {
    try {
        await database.deletePaste(req.params.id);
        for (let i = 0; i < data.pastesList.length; ++i) {
            if (data.pastesList[i].id === req.params.id) {
                data.pastesList.splice(i, 1);
                break;
            }
        }
        res.redirect("/paste/main_page");

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
    res.render("paste/fullMessage", fullMessage);
});

router.post("/content", async (req, res) => {
    await data.pastesList.push(await database.addPasteIntoTheDataBase(req.body.content));
    res.redirect("/paste/main_page");
});

module.exports = router;