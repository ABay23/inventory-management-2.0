const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

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

  //* Create New User
  const user = User.create({
    name,
    email,
    password,
  })

  //* Validating methods
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      photo: user.photo,
      userAdmin: user.userAdmin,
    })
    // }
    // if (user) {
    //   const { _id, name, email, photo, userAdmin } = user
    //   res.status(201).json({
    //     _id,
    //     name,
    //     email,
    //     photo,
    //     userAdmin,
    //   })
  } else {
    res.status(400)
    throw new Error('Invalid user Information')
  }
})

module.exports = {
  registerUser,
}
