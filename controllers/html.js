const path = require("path");

const getIndexHTML = (req, res) => {
  filePath = path.join(__dirname, "../public", "index.html");
  res.sendFile(filePath);
  return filePath;
};

const getNotesHTML = (req, res) => {
  filePath = path.join(__dirname, "../public", "notes.html");
  res.sendFile(filePath);
  return filePath;
};

module.exports = { getNotesHTML, getIndexHTML, };