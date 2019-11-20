//jshint esversion:6
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB",  {useNewUrlParser: true, useUnifiedTopology:true})

const fruitSchema = new mongoose.Schema ({
  name: String,
  rating: Number,
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const apple = new Fruit({
  name:"Apple",
  rating:7,
  review:"woop"
});
const orange = new Fruit({
  name:"Orange",
  rating:7,
  review:"woop"
});
const banana = new Fruit({
  name:"Banana",
  rating:7,
  review:"woop"
});

// Fruit.insertMany([apple, orange, banana], function(err){
//   if (err)
//     console.log(err);
// });

Fruit.find(function(err, fruits){
  if (err){
    console.log(err);
  }
  else{
    fruits.forEach(function(fruit){
          console.log(fruit.name);
    });
    mongoose.connection.close();
  }
});

const humanSchema = new mongoose.Schema ({
  name: String,
  age : Number
});

const Human = mongoose.model("Human", humanSchema);

const person = new Human({
  name:"Alec",
  age:27
});

//person.save();
