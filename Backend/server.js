const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const colors = require('colors')
const PORT = process.env.PORT || 5001
const connectDB = require('./config/db')
const errorHandler = require('./middleware/errorMiddleware')
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/userRoutes')
const contactRoute = require('./routes/contactRoutes')
const productRoute = require('./routes/productRoutes')
const path = require('path')

// Connect to the DB
connectDB()

const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/contactus', contactRoute)

app.get('/', (req, res) => {
  res.send('Home Page')
})

// Error Handler
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
