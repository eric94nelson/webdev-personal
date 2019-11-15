//npm init
//npm install express body-parser request
//nodemon server

//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const date = require(__dirname+"/date.js");


const app = express();

const tasks = ["Buy food", "Cook food", "Eat food"];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get('/about', function(req, res){
  res.render("about");
});

app.get('/', function(req, res){
  res.render("list", {dayOfWeek:date.getDate(), myTasks:tasks});
});

app.post("/", function(req, res){
  tasks.push(req.body.task);
  res.redirect("/");
});

app.listen(3000, function (){
  console.log("Server running on port 3000.");
});
