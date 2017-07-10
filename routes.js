const express = require('express')
const router = express.Router()
const users = require('./models/data')

router.get('/', function(req, res){
  res.render('index', {users: users})
})


router.get('/user/:id', function(req, res){
  const user = users.findByID()
  res.render('user', {users: user})
})

module.exports = router
