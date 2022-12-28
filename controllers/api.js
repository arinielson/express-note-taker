const path = require("path");
const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const getNotesFromDatabase = async (req, res) => {
  try {
    const notes = await readFileAsync("../db/db.json");
    res.json(JSON.parse(notes));
    
  } catch (error) {
    throw error;
  }
};

module.exports = getNotesFromDatabase;