//jshint esversion:6

//would hide these in an environment var instead of committing if commercial use
//739437d1600c3bd5efc971d7b6c20aa9-us5
//8c654ef563

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/signup.html");
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.post("/", function(req, res) {
  console.log(req.body);

  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  console.log(firstName);

  var memberData = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          "FNAME": firstName,
          "LNAME": lastName
        }
      }
    ]
  };

  var memberDataString = JSON.stringify(memberData);

  var options = {
    url: "https://us5.api.mailchimp.com/3.0/lists/8c654ef563",
    method: "POST",
    headers: {
      "Authorization": "eric94nelson 739437d1600c3bd5efc971d7b6c20aa9-us5"
    },
    body: memberDataString
  };

  request(options, function(error, response, body) {
    if (error || response.statusCode != 200) {
      res.sendFile(__dirname + "/public/failure.html");
    } else {
      res.sendFile(__dirname + "/public/success.html");
    }
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server running on port 3000.");
});
