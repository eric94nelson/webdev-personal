//jshint esversion:6
const express = require("express");

const app = express();

app.get("/", function (req, res)
{
  response.send("Hello World");
});

app.listen(3000);
