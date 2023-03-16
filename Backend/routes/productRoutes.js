const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
} = require('../controllers/productController')
const { upload } = require('../utility/fileUpload')

router.post('/', protect, upload.single('image'), createProduct)
router.get('/', protect, getProducts)
router.get('/:id', protect, getProduct)
router.delete('/:id', protect, deleteProduct)

module.exports = router
