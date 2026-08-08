const express = require("express");
const database = require("../helpers/db");
const router = express.Router();

router.get("/main_page", async (req, res) => {
    const data = await database.getAllPastes();
    res.render("fullList/index",  { data });
});

router.post("/:id/edit", async (req, res) => {
    try {
        await database.updatePaste(req.params.id, req.body.content);
        res.redirect("/paste/main_page");
    } catch(err) {
        console.error(err);
    }
});

router.post("/:id/delete", async (req, res) => {
    try {
        await database.deletePaste(req.params.id);
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
    await database.addPasteIntoTheDataBase(req.body.content);
    res.redirect("/paste/main_page");
});

module.exports = router;