//jshint esversion:6
const express = require("express");
const bp = require ("body-parser");

const app = express();
app.use(express.static("webpage"));
app.use(bp.urlencoded({extended: true}));

app.get("/", function (req, res)
{
  res.sendFile(__dirname+"/webpage/index.html");
});

app.get("/bmi-calculator", function (req, res)
{
  res.sendFile(__dirname+"/webpage/bmi-calculator.html");
});

app.post("/", function(req, res)
{
  res.send("The result is "+ (Number(req.body.num1) + Number(req.body.num2)));
});

app.post("/bmi-calculator", function(req, res)
{
  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);
  var result = weight / (height * height);

  res.send("The result is "+ result);
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
