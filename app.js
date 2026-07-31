const express = require("express");
const app = express();
const port = 3000;
const dataBaseConection = require("./helpers/db");
const path = require('path');
const bodyParser = require('body-parser');
dataBaseConection.connectToTheDataBase();
const paste = require("./routes/paste");

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use("/paste", paste);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res, next) => {
    res.redirect("/paste/main_page");
});

module.exports = app;