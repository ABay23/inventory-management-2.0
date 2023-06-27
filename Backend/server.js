const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const colors = require('colors')
const PORT = process.env.PORT || 5002
const connectDB = require('./config/db')
const errorHandler = require('./middleware/errorMiddleware')
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/userRoutes')
const contactRoute = require('./routes/contactRoutes')
const productRoute = require('./routes/productRoutes')
const path = require('path')

const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

// //* Validate credentials for Frontend and server
// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL],
//     credentials: true,
//   })
// )

// check headers for cors and cookies in the browser console
app.use((req, res, next) => {
  const cookieHeader = req.headers.cookie
  // console.log('cookieHeader', cookieHeader)
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL)
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )

  next()
})

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   next()
// })

// app.options('*', cors())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/contactus', contactRoute)

// app.get('/', (req, res) => {
//   res.send('Home Page')
// })

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  // FIX: below code fixes app crashing on refresh in deployment
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
  })
} else {
  app.get('/', (_, res) => {
    res.status(200).json({ message: 'Welcome to the Support Desk API' })
  })
}

// Error Handler
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})

// Connect to the DB
connectDB()
