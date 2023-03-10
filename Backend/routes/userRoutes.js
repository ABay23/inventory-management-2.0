const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { registerUser, loginUser } = require('../controllers/userController')

router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router
