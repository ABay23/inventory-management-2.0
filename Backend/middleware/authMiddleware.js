const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const dotenv = require('dotenv')

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token
  try {
    //* Validate token
    if (!token) {
      res.status(400)
      throw new Error('Not authorized, please login (no token)')
    }

    //* Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET)

    //* Get user id from the token
    const user = await User.findById(verified.id).select('-password')

    //* Validate user
    if (!user) {
      res.status(400)
      throw new Error('User not found')
    }
    //* Asign user to req
    req.user = user

    next()
  } catch (error) {
    console.log(error)
    res.status(401)
    throw new Error('Not authorized, please login (Catch)')
  }
})
module.exports = protect
