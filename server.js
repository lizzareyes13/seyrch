const express = require('express');
const app = express();
const Yelp = require('yelp');
const OAuth = require("oauth");
const YELP_KEY = "DrSxFHaExEG7JnvfplXKWA";
const YELP_SECRET = "0OHyGS6twi3SrQboaY26tHJGlr4";
const YELP_TOKEN = "BOTZhZwJEH0V05sK8Isu3VGpTGsSjpG8"
const YELP_TOKENSECRET = "uLHRQlxpAUadPG1O3Tidssd43Xo";
// const cors = require(`cors`);

// app.use(cors());

//
app.get("/", function(req,res){
  console.log("received request");
  res.sendFile(__dirname + '/webpage/index.html');
  //to generate a random number, the code would be:
    // res.send("" + Math.floor(Math.random()*9));
});
app.get('/css/style.css', function(req,res){
  res.sendFile(__dirname + '/webpage/css/style.css');
});

app.get("/random/:start/:end", function(req,res){
  var start = req.params.start;
  var end = req.params.end;
  var total = Math.floor(Math.random()*(end-start) + start);
  res.send("" + total);
});

app.get("/getsushiinmiami", function(req, res){
  var yelp = new Yelp({
  consumer_key: YELP_KEY,
  consumer_secret: YELP_SECRET,
  token: YELP_TOKEN,
  token_secret: YELP_TOKENSECRET,
});
yelp.search({ term: 'sushi', location: 'Miami, FL' })
.then(function (data) {
  console.log(JSON.stringify(data,null, 2));
  res.json(data);
})
.catch(function (err) {
  console.error(err);
  res.send(err);
});
});


//SEARCH REQUEST
app.get('/seyrch/:city/:term',function(req,res){
  var yelp = new Yelp({
    consumer_key: YELP_KEY,
    consumer_secret: YELP_SECRET,
    token: YELP_TOKEN,
    token_secret: YELP_TOKENSECRET,
  })
  yelp.search({ term: req.params.term, location: req.params.city})
  .then(function(data){
    console.log(JSON.stringify(data,null, 2));
    res.json(data);
  })
  .catch(function(err){
    console.error(err);
    res.send(err);
  });
});
app.listen(3000,function(){
  console.log("server listening on port 3000");
});
