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
  first_name: {type: String}
});





app.listen(5000, function() {
  console.log('I am listening.');
});
