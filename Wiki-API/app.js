//npm init
//npm install express body-parser request ejs
//nodemon server

//IF have to deploy using subtree bc server is in subdirectory of git repo
//git subtree push --prefix NewsletterSignUp heroku master

//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const mongoose = require('mongoose');

var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
//mongodb://localhost:27017/myproject
//mongodb+srv://eric-admin:Test123@cluster0-grkvt.mongodb.net/blogDB
mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser: true, useUnifiedTopology:true});
mongoose.set('useFindAndModify', false);

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

/////////////////// requests targeting all articles /////////////////////

app.route("/articles")

.get(function(req, res){
  //res.sendFile(__dirname+"/public/index.html");
  Article.find({}, function (err, foundArticles){
    if (err){
      res.send(err);
    }
    else{
      res.send(foundArticles);

    }
  });
})


.post(function(req, res){
  console.log(req.body.title);
  const article = new Article({
    title:req.body.title,
    content:req.body.content
  });
  article.save(function(err){
    if (!err){
      res.sendStatus(200);
    }
    else{
      res.send(err);
    }
  });
})

.delete(function(req, res){
  Article.deleteMany({}, function(err){
    if (!err){
      res.send("Articles deleted");
    }
    else{
      console.log(err);
    }
  });
});

/////////////////// requests targeting a specific article /////////////////////

app.route("/articles/:title")

.get(function(req, res){
  //res.sendFile(__dirname+"/public/index.html");
  Article.findOne({title:req.params.title}, function (err, foundArticle){
    if (err){
      res.send(err);
    }
    else{
      res.send(foundArticle);

    }
  });
})

.put(function(req, res){
  //res.sendFile(__dirname+"/public/index.html");
  Article.update({title:req.params.title},
    {title:req.body.title, content:req.body.content},
    {overwrite: true},
    function (err, foundArticle){
    if (err){
      res.send(err);
    }
    else{
      res.send(foundArticle);
    }
  });
})

.patch(function(req, res){
  //res.sendFile(__dirname+"/public/index.html");
  Article.update({title:req.params.title},
    {$set: req.body},
    function (err, foundArticle){
    if (err){
      res.send(err);
    }
    else{
      res.send(foundArticle);
    }
  });
})

.delete(function(req, res){
  Article.deleteOne({title:req.params.title}, function(err){
    if (!err){
      res.send("Article deleted");
    }
    else{
      console.log(err);
    }
  });
});


app.listen(3000, function (){
  console.log("Server running on port 3000.");
});
