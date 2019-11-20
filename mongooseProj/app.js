//jshint esversion:6
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB",  {useNewUrlParser: true, useUnifiedTopology:true})

const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, 'specify name']
  },
  rating: {
    type: Number,
    min:0,
    max:10
  },
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

// Fruit.updateOne({name:"Orange"}, {rating:10}, function(err){
//   if (err){
//     console.log(err);
//   }
//   else{
//     console.log("update success");
//   }
// });

// Fruit.deleteOne({_id: "5dd47c7965ce03486c857d76"}, function(err){
//   if (err){
//     console.log(err);
//   }
//   else{
//     console.log("deleted");
//   }
// });

const pineapple = new Fruit({
  name:"Pineapple",
  rating:9,
  review:"gip"
});

pineapple.save();

const humanSchema = new mongoose.Schema ({
  name: String,
  age : Number,
  favoriteFruit: fruitSchema
});

const Human = mongoose.model("Human", humanSchema);

// const person = new Human({
//   name:"Amy",
//   age:12,
//   favoriteFruit: pineapple
// });
//
// person.save();


Fruit.find(function(err, fruits){
  if (err){
    console.log(err);
  }
  else{
    fruits.forEach(function(fruit){
          console.log(fruit.name + " "+fruit.rating+"\n");
    });
  }
    mongoose.connection.close();
});
