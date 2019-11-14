//npm init
//npm install express body-parser request
//nodemon server

//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

app.get('/', function(req, res){
  var day = "";
  var today = new Date();
  var currentDay = weekday[today.getDay()];
  res.render("list", {dayOfWeek:currentDay});
//  res.sendFile(__dirname+"/public/index.html");
});

app.listen(3000, function (){
  console.log("Server running on port 3000.");
});
