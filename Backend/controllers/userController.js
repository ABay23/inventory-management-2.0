const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const jwt = require('jsonwebtoken')

// @desc    Register a new user
// @route   /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  res.send('Register user')
})

module.exports = {
  registerUser,
}
