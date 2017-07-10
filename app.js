const MongoClient = require('mongodb').MongoClient
  , assert = require('assert')
const url = 'mongodb://localhost:27017/robots'
const express = require('express');
const path = require('path');
const mustache = require('mustache-express');
const app = express();

app.use(express.static('public'))

app.engine('mustache', mustache());
app.set('view engine', 'mustache')
app.listen(3000, function(){
  console.log("GOOD TO GO!!")
})

// const router = require('./routes')

// app.use('/', router)
// app.use('/user/:id', router)
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
