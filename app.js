const data = require('./public/data.js')
const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const app = express();


app.use(express.static('public'))

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.listen(3000, function(){
  console.log("GOOD TO GO!!");
})

const users = data.users

for (var i = 0; i < users.length; i++) {
  var id = users[i].id
  var name = users[i].name
  var avatar = users[i].avatar
  var company = users[i].company
  var job = users[i].job
  var city = users[i].address.city
  var country = users[i].address.country
  var email = users[i].email
  var phone = users[i].phone
  var university = users[i].university
  var skills = users[i].skills
}


app.get('/', function(req, res){
res.render('index', {users :users})
})


app.get('/user/:id', function(req, res){

// res.send(req.params)
res.render('user', {users :users})
})

app.get('/unemployed', function(req, res){
res.render('unemployed')
})

app.get('/nodata', function(req, res){
res.render('nodata')
})
