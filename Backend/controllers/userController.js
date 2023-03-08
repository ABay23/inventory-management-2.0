const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')

// @desc    Register a new user
// @route   /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  //* Validation for empty fields

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // Validate password length

  if (password.length < 6) {
    res.status(400)
    throw new Error('Your password needs to have more than 6 characters')
  }

  if (password.length > 25) {
    res.status(400)
    throw new Error('Your password needs to have less than 25 characters')
  }

  //* Validate if user email existss
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('Te email already exists')
  }

  //* Encrypt Password before saving into DB
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //* Create New User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  //* Generate token
  const token = generateToken(user._id)

  //* Set HTTP-Only cookie
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 864000), //The equivalent to one day
    sameSite: 'none',
    secure: true,
  })
  //* Validating methods
  // if (user) {
  //   res.status(201).json({
  //     _id: user._id,
  //     name: user.name,
  //     email: user.email,
  //     photo: user.photo,
  //     // userAdmin: user.userAdmin,
  //   })
  //   // }
  if (user) {
    const { _id, name, email, photo, userAdmin } = user
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      userAdmin,
      token: token,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user Information')
  }
})

//* Generate Token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

module.exports = {
  registerUser,
}
