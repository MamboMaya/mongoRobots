const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient
  , assert = require('assert')
mongoose.Promise = require('bluebird')
const url = 'mongodb://localhost:27017/robots'
const express = require('express');
const path = require('path');
const mustache = require('mustache-express');
const app = express();
const mongoURL = process.env.MONGODB_URI || "mongodb://localhost:27017/robots"
mongoose.connect(mongoURL)



app.use(express.static('public'))

app.engine('mustache', mustache());
app.set('view engine', 'mustache')

const port = process.env.PORT || 3000
app.listen(port, function(){
  console.log("Now listening on port" + port)
})

app.get('/', function(req, res){

MongoClient.connect(url, function(err, db) {
  if (err) {
    throw err
  } else {
    console.log('Successfully connected to the database')
  }
  // const data = require("./data");
  // for (var i = 0; i < data.users.length; i++) {
    // const user = data.users[i];
    db.collection('users')
      .find()
      .limit(20)
      .toArray( function(err, robots){

        // console.log(robots);

        res.render('index', {
          users: robots
        })
        })
    })

})

app.get('/unemployed', function(req, res){
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw err
    } else {
      console.log('Successfully connected to the database');
    }
  db.collection('users')
  .find({ job: null})
  .toArray(function(err, robots){
    res.render('unemployed', {
      users: robots
    })
  })
})
})

app.get('/employed', function(req, res){
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw err
    } else {
      console.log('Successfully connected to the database');
    }
    db.collection('users')
      .find({job: {$exists: true}})
      .toArray(function(err, robots){
        res.render('employed', {
            users: robots
          })
        })
      })
})
