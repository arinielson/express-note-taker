const express = require("express");
const fs = require("fs");
const cors = require("cors");

const path = require("path");

const util = require("util");

const readFileAsync = util.promisify(fs.readFile);

const writeFileAsync = util.promisify(fs.writeFile);

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => 
  res.send('Navigate to /notes')
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get("/api/notes", async (req, res) => {  
  try {
    const notes = await readFileAsync("./db/db.json", "utf-8");
    res.json(JSON.parse(notes));
  } catch (error) {
    throw error;
  }
});

app.post("/api/notes", async (req, res) => {  
  try {
    const notes = await readFileAsync("./db/db.json", "utf-8");
    const newNote = req.body;
    const newNoteData = {            
      title: newNote.title,
      text: newNote.text,
    };
    
    const parseNote = JSON.parse(notes);
    
    parseNote.push(newNoteData);
    res.json(newNoteData);
    
    await writeFileAsync("./db/db.json", JSON.stringify(parseNote));
    
  } catch (error) {
    throw error;
  }
});

app.listen(PORT, () => {
  console.log(`Note taker app listening at http://localhost:${PORT}`);
});