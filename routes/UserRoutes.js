const express = require('express')
const route = express.Router()
const auth = require('../controllers/UserAuthController')

route.post('/create', auth.createUser)
route.post('/login', auth.loginUser)

module.exports = route