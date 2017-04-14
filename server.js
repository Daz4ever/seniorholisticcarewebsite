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
  token: String,
  date: Date
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

app.post('/contactform', function(request, response){
  var formdata = request.body;
  console.log(formdata);
  var form = new Form({
    first_name: formdata.first,
    last_name: formdata.last,
    phone_number: formdata.phone,
    email_address: formdata.email,
    radio_button: formdata.radio,
    questions: formdata.anyquestions,
    date: new Date(),
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



app.listen(5000, function() {
  console.log('I am listening.');
});
