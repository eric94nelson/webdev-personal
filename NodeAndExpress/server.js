//jshint esversion:6
const express = require("express");
const app = express();
app.get("/", function(request, response){
  //console.log(request);
  response.send("hello");
});

app.listen(3000);
