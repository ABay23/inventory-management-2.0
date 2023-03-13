const multer = require('multer')

//* Define file Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
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
    cb(null, false)
  } else {
    // To accept the file pass `true`, like so:
    cb(null, true)
  }
}

const upload = multer({ storage: storage, fileFilter })

module.exports = { upload }
