const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
} = require('../controllers/userController')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/getuser', protect, getUser)
router.get('/loggedin', loginStatus)
router.patch('/updateuser', protect, updateUser)
router.patch('/changepassword', protect, changePassword)
router.post('/forgotpassword', forgotPassword)

module.exports = router
