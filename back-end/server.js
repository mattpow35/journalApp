const express = require('express');
const bodyParser = require("body-parser");

const multer = require('multer');
const upload = multer({
  dest: '/var/www/journalsharing.mattpowley.com/images/',
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
  date: String,
  likes: Number,
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
    date: req.body.date,
    likes: 0,
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

app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async (req, res) => {
    try {
      await Item.deleteOne({
        _id: req.params.id
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

app.put('/api/items/:id', async (req, res) => {
    try {
      let item = await Item.findOne({
        _id: req.params.id
      });
      item.likes = req.body.likes;

      item.save();
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});




app.listen(3001, () => console.log('Server listening on port 3001!'));
