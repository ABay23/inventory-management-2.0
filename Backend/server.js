const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const colors = require('colors')
const PORT = process.env.PORT || 5001
const connectDB = require('./config/db')

const app = express()

// Connect to the DB
connectDB()
