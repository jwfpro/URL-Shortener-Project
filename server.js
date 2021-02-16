const mongoose = require('mongoose');
const express = require('express');
const GenShortURL = require('./models/genShortURL');
const app = express();
const port = 9000;

// create db
mongoose.connect('mongodb://localhost/urlDB', {
  useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}))

app.get('/', async(req,res) => {
  const UrlList = await GenShortURL.find();
  res.render('index', {UrlList: UrlList, port: port});
})

// If long URL not in db, create document for it and generate short URL
app.post('/genShortURL', async(req,res) => {
  const inputUrl = req.body["bigURL"];

  console.log(inputUrl);
  // inputUrl = addSlash(inputUrl);
  console.log(inputUrl);
  const doesLongExist = await GenShortURL.exists({ longUrl: inputUrl });
  if (doesLongExist == false){
    const newUrlPair = GenShortURL({
      longUrl: inputUrl,
      shortUrl: ""
    });
    newUrlPair.shortUrl = newUrlPair.id.toString().slice(-6);
    newUrlPair.save(function(err){
    console.log("URL added successfully");
  })
}
  res.redirect('/');
})

// Basic URL normalization case
// function addSlash(url) {
//   if (url.slice(-1) != '/'){
//     url = url + '/';
//     return url;
//   }
//   else {
//     return url;
//   }
// }

// Get associated long URL from MongoDB and redirect
app.get('/:shortURL', async(req,res) => {
  const shortURL = await GenShortURL.findOne({shortUrl: req.params.shortURL});
  if (shortURL == null) return res.sendStatus(404);
  res.redirect(shortURL.longUrl);
})

app.listen(process.env.PORT || port);
