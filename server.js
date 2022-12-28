const express = require('express');
const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => 
  res.send('Navigate to /notes')
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

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
    const newNoteData = {
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
  console.log(`Note Taker app listening at ${PORT}`)
);