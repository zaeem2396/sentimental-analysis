const express = require('express');
const route = express.Router();
const feedback = require('../controllers/FeedbackController');
const verifyToken = require('../middleware/verifyJWTtoken');

route.post('/create', verifyToken, feedback.create)

module.exports = route