//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser: true, useUnifiedTopology:true});
const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

const buyFood = new Item({
  name: "Buy Food"
});

const cookFood = new Item({
  name: "Cook Food"
});

const eatFood = new Item({
  name: "Eat Food"
});

const items = [buyFood, cookFood, eatFood];
const workItems = [];

Item.insertMany(items, function(err){
  if (err){
    console.log(err);
  }
  else{
    console.log("added items")
  }
});

app.get("/", function(req, res) {

  res.render("list", {listTitle: "Today", newListItems: items});

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
