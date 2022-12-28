const express = require('express');
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const cors = require("cors");
const path = require('path');

const {
  getNotesHTML,
  getIndexHTML,
} = require("./controllers/html");
const getNotesFromDatabase = require("./controllers/api");

const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', getIndexHTML);

app.get('/notes', getNotesHTML);

app.get('api/notes', async (req, res) => {
  try {
    const notes = await readFileAsync('./db/db.json', 'utf-8');
    res.json(JSON.parse(notes));
  } catch (err){
    throw err;
  }  
});

app.post('api/notes', async (req, res) => {
  try {
    const notes = await readFileAsync('./db/db.json', 'utf-8');

    const newNote = req.body;
    const newNoteId = uuidv4();
    const newNoteData = {
      id: newNoteId,
      title: newNote.title,
      text: newNote.text,
    };
    
    const parseNote = JSON.parse(notes);

    parseNote.push(newNoteData);
    res.json(newNoteData);

    await writeFileAsync('./db/db.json', JSON.stringify(parseNote));
  } catch (err){
    throw err;
  }  
});

app.listen(PORT, () =>
  console.log(`Note Taker app listening at http://localhost:${PORT}`)
);