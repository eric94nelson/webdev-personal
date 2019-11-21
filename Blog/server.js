//npm init
//npm install express body-parser request ejs
//nodemon server
//C:\Program Files\MongoDB\Server\4.2\data\

//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")
const mongoose = require('mongoose');

const posts = [];

var app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb+srv://eric-admin:Test123@cluster0-grkvt.mongodb.net/blogDB",{useNewUrlParser: true, useUnifiedTopology:true});
mongoose.set('useFindAndModify', false);

const postSchema = {
  title: String,
  body: String
};

const BlogPost = mongoose.model("BlogPost", postSchema);

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

app.get("/", function(req, res){
  BlogPost.find({}, function(err, foundPosts){
    if (err)
    {
      console.log(err);
    }
    res.render("home", {homeStartingContent:homeStartingContent, posts:foundPosts});
  });

});

app.post("/", function(req, res){
  console.log(req.body.postBody);
  const post = new BlogPost({
    "title":req.body.postTitle,
    "body":req.body.postBody
  });

  post.save(function(err){
    if (!err){
      res.redirect("/");
    }
  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent:aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent:contactContent});
});

app.get("/post", function(req, res){
  res.render("compose");
});

app.get("/posts/:id", function(req, res){
  const id = req.params.id;
  console.log(id);
  BlogPost.findOne({_id: id}, function(err, post){
    if (post){
      console.log ("found post:\n"+post);
      res.render("post", {post:post});
    }
    else{
      console.log("Did not find post");
    }
    if (err){
      console.log(err);
    }

  });
});

app.listen(3000, function (){
  console.log("Server running on port 3000.");
});
