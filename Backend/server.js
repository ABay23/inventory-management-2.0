const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const colors = require('colors')
const PORT = process.env.PORT || 5001
const connectDB = require('./config/db')

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Connect to the DB
connectDB()

// Routes
app.use('/api/users', require('./routes/userRoutes'))

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
