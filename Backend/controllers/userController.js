const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const Token = require('../models/tokenModel')
const crypto = require('crypto')
const emailSender = require('../utility/sendEmail')

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
    expires: new Date(Date.now() + 1000 * 86400), //The equivalent to one day
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

//* Login User

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  //* Validate Request
  if (!email || !password) {
    res.status(400)
    throw new Error('Invalid email and password information')
  }

  //* Find User
  const user = await User.findOne({ email })

  if (!user) {
    res.status(400)
    throw new Error('Invalid user, please signup')
  }

  //* Validate Password
  const compPassword = await bcrypt.compare(password, user.password)

  //* Generate a new token after login
  const token = generateToken(user._id)

  //* Set HTTP-Only cookie

  if (compPassword) {
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), //The equivalent to one day
      sameSite: 'none',
      secure: true,
    })
  }

  if (user && compPassword) {
    const { _id, name, email, photo, userAdmin } = user
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      userAdmin,
      token,
    })
  } else {
    res.status(400)
    throw new Error('Invalid email or Password')
  }
})

//* Logout user

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0), //* Expire the cookie
    sameSite: 'none',
    secure: false,
  })
  res.status(200).json({ message: 'Successfully Logged out' })
})

//* Get user Profile

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    const { _id, name, email, photo, userAdmin } = user
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      userAdmin,
    })
  } else {
    res.status(400)
    throw new Error('User not found')
  }
})

//* Get login Status
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token

  if (!token) {
    return res.json(false)
  }
  //* Verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET)

  if (verified) {
    return res.json(true)
  } else {
    return res.json(false)
  }
})

//* Update User

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    const { name, email, photo, userAdmin } = user
    user.email = email
    user.name = req.body.name || name
    user.photo = req.body.photo || photo
    user.userAdmin = req.body.userAdmin || userAdmin

    const updatedUser = await user.save()
    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo,
      userAdmin: updatedUser.userAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found, Please login')
  }
})

const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  const { oldPassword, password } = req.body

  //* Validate User
  if (!user) {
    res.status(404)
    throw new Error('User not found, please signup')
  }
  //* Validate Password
  if (!oldPassword || !password) {
    res.status(400)
    throw new Error('Please add old and new password.')
  }
  //* Confirm password is correct
  const confirmPassword = await bcrypt.compare(oldPassword, user.password)

  //* Save new password
  if (user || confirmPassword) {
    user.password = req.body.pasword

    const savePassword = await user.save()
    res.status(201).json({ message: 'Password Updated.' })
  } else {
    res.status(400)
    throw new Error('Password is incorrect.')
  }
})

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  //* Create reset token
  let resetToken = crypto.randomBytes(32).toString('hex') + user._id

  //* Hash token
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  //* Save token to DB
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), // Multiply by 30 minutes
  }).save()

  //* Build Reset url
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${hashedToken}`

  //* Reset Email
  const message = ` <h2>Hello ${user.name}</h2>
  <p>You requested a password reset</p>
  <p>Please use the link below to reset your pasword</p>
  <p>This link would be valid only for the next 30 minutes</p>

  <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
  <p>Regards...</p>
  <p>Inventory team.</p>
`
  const subject = 'Password Reset'
  const send_to = user.email
  const send_from = process.env.EMAIL_USER

  try {
    await emailSender(subject, message, send_to, send_from)
    res.status(200).json({ success: true, message: 'Reset Email Sent' })
  } catch (error) {
    res.status(500)
    throw new Error('Email not sent, please try again.')
  }

  res.send('forgot Password')
})

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
}
