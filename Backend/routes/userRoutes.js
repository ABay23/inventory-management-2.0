const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const jwt = require('jsonwebtoken')
const protect = require('../middleware/authMiddleware')
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
} = require('../controllers/userController')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/getuser', protect, getUser)

module.exports = router
