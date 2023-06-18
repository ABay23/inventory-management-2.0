const multer = require('multer')

//* Define file Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Backend/uploads')
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
    )
  },
})

//* File Filter
function fileFilter(req, file, cb) {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg'
  ) {
    // To reject this file pass `false`, like so:
    cb(null, true)
  } else {
    // To accept the file pass `true`, like so:
    cb(null, false)
  }
}

const upload = multer({ storage, fileFilter })

//* File Size Format
const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return '0 Bytes'
  }
  const dm = decimal || 2
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB']
  const index = Math.floor(Math.log(bytes) / Math.log(1000))
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index]
  )
}

module.exports = { upload, fileSizeFormatter }
