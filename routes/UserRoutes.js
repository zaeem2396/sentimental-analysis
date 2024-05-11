const express = require('express')
const route = express.Router()
const auth = require('../controllers/UserAuthController')
const verifyToken = require('../middleware/verifyJWTtoken')

route.post('/create', auth.createUser)
route.post('/login', auth.loginUser)
route.get('/profile', verifyToken, auth.getProfile)
route.patch('/update', verifyToken, auth.updateProfile)

module.exports = route