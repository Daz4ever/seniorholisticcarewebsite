const mongoose = require('mongoose');
// mongoose.set('debug', true);
const bluebird = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt');
const uuidV1 = require('uuid/v1');

app.use(express.static('public/templates'));
app.use(bodyParser.json());
mongoose.Promise = bluebird;
const ObjectId = mongoose.Schema.ObjectId;

mongoose.connect('mongodb://localhost/holistic_db');

var randomToken = uuidV1();

const User = mongoose.model('User', {
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  token: String
});

const Form = mongoose.model('Form', {
  first_name: {type: String},
  last_name: {type: String},
  phone_number: {type: String},
  email_address: {type: String},
  radio_button: {type: String},
  questions: {type: String},
  date: Date,
  username: String
});

app.post('/login', function(request, response) {
   var userdata = request.body;
   console.log("XXXXXXXXXX", userdata);
   User.findOne({ username: userdata.username, password: userdata.password})
   .then(function(user){
     if(user.password === "holistic12345"){
       user.token = randomToken;
       return user.save()
       .then(function(user){
         response.send(user);
       })
       .catch(function(err){
         console.log('OMG ERROR: ', err.message);
       });
     }
     else{
       console.log("Login Failed");
       response.status(401);
       response.send('Login Failed');
     }
   });
});

app.post('/contactform', function(request, response){
  var formdata = request.body;
  console.log(formdata);
  var form = new Form({
    first_name: formdata.first,
    last_name: formdata.last,
    phone_number: formdata.phone,
    email_address: formdata.email,
    radio_button: formdata.radio,
    questions: formdata.question,
    date: new Date(),
    username: formdata.username
  });
  form.save()
  .then(function(saved){
    response.send(saved);
    })
    .catch(function(err){
        console.log("oh NOO!!!", err.errors);
        response.send(err.message);
        console.log(err.stack);
      });
});



function auth(request, response, next) {
   //verify auth token
   console.log(request.method, request.path);
   var token = request.query.token;
   if (!token) {
     response.status(401);
     response.json({error: "you are not logged in"});
     return;
   }
   User.findOne({token: token})
   .then(function(user){
     console.log("k", token);
     console.log("k2", user.token);
     console.log('k3', user);
     if(user.token === token) {

       next();
     } else {
       response.status(401);
       response.json({error: "you are not logged in"});
     }


 });
 }

app.get('/allforms', function(request, response){
  var username = request.query.username;
  Form.find({username: username})
  .then(function(forms){
    response.send(forms);
  })
  .catch(function(err){
    console.log(err.errors);
    console.log(error.stack);
  });
});

app.post('/delete', function(request, response){
  var id = request.body.id;
  console.log("heres the id", id);
  return Form.remove({_id: id})
  .then(function(){
    response.send("success");
  })
  .catch(function(){
    console.log(err.errors);
  });
});


app.listen(5000, function() {
  console.log('I am listening.');
});
