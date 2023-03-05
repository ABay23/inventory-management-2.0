const mongoose = require('mongoose')
const dotenv = require('dotenv')

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI)
    console.log(
      `MongoDB connected to: ${connect.connection.host}`.cyan.underline
    )
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline)
    console.log(process.env.MONGO_URI)
    process.exit(1)
  }
}
module.exports = connectDB
