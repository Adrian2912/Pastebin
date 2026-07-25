const {Client} = require("pg");
const client = new Client({
    host : 'localhost',
    user : 'postgres',
    port : 5434,
    password : "Ordean.Adrian291203",
    database : 'pastebin'
  });
  
function connectToTheDataBase() {
  client.connect();
}

async function getPasteById(pasteId) {
  const paste = await client.query(`Select content from public."Pastes" where id = ${pasteId};`);
  return paste.rows[0].content;
}

function addPasteIntoTheDataBase(pasteContent) {
  client.query(`Insert into public."Pastes"(content) values ('${pasteContent}')`);
}

async function getAllPastes() {
  let allPastes = await client.query('SELECT * FROM public."Pastes" order by id');
  return allPastes.rows;
}

async function updatePaste(pasteId, pasteContent) {
  await client.query(`Update public."Pastes" Set content = '${pasteContent}' where id = ${pasteId}`);
}

async function deletePaste(pasteId) {
  await client.query(`Delete from public."Pastes" where id = ${pasteId}`);
}

module.exports = {client, connectToTheDataBase, getPasteById, addPasteIntoTheDataBase, getAllPastes, updatePaste, deletePaste};