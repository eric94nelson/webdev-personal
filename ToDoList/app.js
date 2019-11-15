//npm init
//npm install express body-parser request
//nodemon server

//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');


const app = express();

var tasks = ["Buy food", "Cook food", "Eat food"];

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  var day = "";
  var today = new Date();
  var options = {
    weekday:"long",
    day:"numeric",
    month:"long"
  };
  var currentDay = today.toLocaleDateString("en-US", options);
  res.render("list", {dayOfWeek:currentDay, myTasks:tasks});
//  res.sendFile(__dirname+"/public/index.html");
});

app.post("/", function(req, res){
  console.log(req.body.task);
  tasks.push(req.body.task);

  res.redirect("/");
});

app.listen(3000, function (){
  console.log("Server running on port 3000.");
});
