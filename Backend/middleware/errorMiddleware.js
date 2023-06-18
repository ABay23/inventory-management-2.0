const errorHandler = (err, req, res, next) => {
  //* Error Headers
  console.error(err.stack)
  console.log('Error Handling Request: ', req.path)
  console.log('Response Headers: ', res.getHeaders())

  if (res.headersSent) {
    console.error('Headers already sent - Cannot Modify')
    return next(err)
  }

  const statusCode = res.statusCode ? res.statusCode : 500

  res.status(statusCode)

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

module.exports = errorHandler
