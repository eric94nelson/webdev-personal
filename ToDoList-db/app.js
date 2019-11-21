//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
const _ = require('lodash');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://eric-admin:Test123@cluster0-grkvt.mongodb.net/todolistDB",{useNewUrlParser: true, useUnifiedTopology:true});
mongoose.set('useFindAndModify', false);

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

const welcome = new Item({
  name: "Welcome to my ToDoList app using MongoDB"
});

const add = new Item({
  name: "Enter text and hit '+' to add a new task"
});

const remove = new Item({
  name: "<-- Hit the checkbox to delete tasks"
});

const items = [welcome, add, remove];
const workItems = [];

app.get("/", function(req, res) {

  Item.find({}, function(err, foundItems){

    if (err)
    {
      console.log(err);
    }
    if (foundItems.length === 0)
    {
       Item.insertMany(items, function(err2)
       {
         if (err2)
         {
           console.log(err2);
         }
         else
         {
           console.log("added items");
         }
       });
      res.redirect("/");
    }
    else
    {
      res.render("list", {
      listTitle: "Today",
      newListItems: foundItems
    });
    console.log(foundItems);
    }
  });

});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const item = new Item({
    name: itemName
  });

  const listName = req.body.list;

  if (listName === "Today"){
    item.save();
    res.redirect("/");
  }

  List.findOne({name:listName}, function(err, foundList){
if (err)
{
  console.log(err);
}
if (foundList){
  foundList.items.push(item);
  foundList.save();
  res.redirect("/"+listName);
}
  });


});

app.post("/delete", function(req, res){
  const listName = req.body.listName;
  const itemId = req.body.checkbox;
  if (listName === "Today"){
    Item.findByIdAndRemove(req.body.checkbox, function(err){
      if (!err){
        console.log("deleted item");
        res.redirect("/");
      }
    });
  }
else{
  List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: itemId}}}, function(err, foundList){
    if (!err){
      res.redirect("/"+listName);
    }
  })
}
});

app.get("/:listName", function(req,res){
  const customListName = _.capitalize(req.params.listName);
  List.findOne({name: customListName}, function(err, foundList){
    if (err)
    {
      console.log(err);
    }
    if (!foundList)
    {
      console.log(req.params.listName);
      const newList = new List(
        {name:customListName,
          items: items
      });

      newList.save();
      res.redirect("/"+req.params.listName);
    }
    else
    {
      res.render("list", {
      listTitle: foundList.name,
      newListItems: foundList.items
    });
    console.log("found "+ foundList);
    }
  });
});

app.get("/about", function(req, res){
  res.render("about");
});

let port = process.env.PORT;
if (port == null || port == ""){
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started");
});
