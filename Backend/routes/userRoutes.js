const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { registerUser } = require('../controllers/userController')

router.post('/register', registerUser)

module.exports = router
