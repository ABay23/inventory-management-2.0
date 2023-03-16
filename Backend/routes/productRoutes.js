const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const {
  createProduct,
  getProducts,
} = require('../controllers/productController')
const { upload } = require('../utility/fileUpload')

router.post('/', protect, upload.single('image'), createProduct)
router.get('/', protect, getProducts)

module.exports = router
