//jshint esversion:6
const express = require("express");
const bp = require ("body-parser");

const app = express();
app.use(express.static("webpage"));
app.use(bp.urlencoded({extended: true}));

app.get("/", function (req, res)
{
  //C:/Users/eric9/OneDrive/Documents/webdev/CalculatorServer/webpage/
  res.sendFile(__dirname+"/webpage/index.html");
//  res.sendFile(__dirname+"/webpage/styles.css");
});

app.post("/", function(req, res){
  res.send("The result is "+ (Number(req.body.num1) + Number(req.body.num2)));
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
