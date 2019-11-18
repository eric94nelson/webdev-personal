//npm init
//npm install express body-parser request ejs
//nodemon server

//jshint esversion:6

var express = require('express');
var bodyParser = require('body-parser');
const ejs = require("ejs");

var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


app.get("/", function(req, res){
  res.sendFile(__dirname+"/public/index.html");
});

app.listen(3000, function (){
  console.log("Server running on port 3000.");
});
