const express = require("express");
const app = express();
const port = 3000;
const dataBaseConection = require("./DataBaseConnection");
const path = require('path');
const bodyParser = require('body-parser');

dataBaseConection.connectToTheDataBase();

const data = {
    pastesList : []
}

dataBaseConection.client.query('SELECT * FROM public."Pastes" order by id', (err, res) => {
    if (!err) {
        for (let i = 0; i < res.rows.length; ++i) {
            data.pastesList.push(res.rows[i]);
        }
    }
});

const pastesRendering = require("./routes/pastesRendering");

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use("/pastesRendering", pastesRendering);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res, next) => {
    res.render('index', data);
});

module.exports = app;