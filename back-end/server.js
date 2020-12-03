const express = require('express');
const bodyParser = require("body-parser");

const multer = require('multer');
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/journal', {
  useNewUrlParser: true
});


const itemSchema = new mongoose.Schema({
  name: String,
  path: String,
  message: String,
  // date: String,
  // path: String,
});

const Item = mongoose.model('Item', itemSchema);

app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

app.post('/api/items', async (req, res) => {

  const item = new Item({
    name: req.body.name,
    path: req.body.path,
    message: req.body.message,
    // date: ,
    // path:
  });
  try {
    console.log("trying to save new item");
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});




app.listen(3000, () => console.log('Server listening on port 3000!'));
