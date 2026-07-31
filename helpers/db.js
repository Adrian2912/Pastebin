const { Client } = require("pg");
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
  const paste = await client.query(`SELECT content FROM public."Pastes" WHERE id = ${pasteId};`);
  return paste.rows[0].content;
}

async function addPasteIntoTheDataBase(pasteContent) {
  const result = await client.query(`INSERT INTO public."Pastes"(content) VALUES ('${pasteContent}') RETURNING id, content;`);
  return result.rows[0];
}

async function getAllPastes() {
  let allPastes = await client.query('SELECT * FROM public."Pastes" ORDER BY id');
  return allPastes.rows;
}

async function updatePaste(pasteId, pasteContent) {
  await client.query(`UPDATE public."Pastes" SET content = '${pasteContent}' WHERE id = ${pasteId}`);
}

async function deletePaste(pasteId) {
  await client.query(`DELETE FROm public."Pastes" WHERE id = ${pasteId}`);
}

module.exports = {client, connectToTheDataBase, getPasteById, addPasteIntoTheDataBase, getAllPastes, updatePaste, deletePaste};