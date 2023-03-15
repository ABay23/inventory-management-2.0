const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const { fileSizeFormatter } = require('../utility/fileUpload')

const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, price, quantity, description } = req.body

  //* Validation
  if (!name || !category || !price || !description) {
    res.status(400)
    throw new Error('Please fill in all the fields')
  }

  //* Handle image upload
  let fileData = {}

  if (req.file) {
    fileData = {
      fileName: req.file.originalname,
      filePath: req.file.path,
      filetype: req.file.mimetype,
      fileZise: fileSizeFormatter(req.file.size, 2),
    }
  }

  const product = await Product.create({
    user: req.user._id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
    image: fileData,
  })
  res.status(201).json(product)
})

module.exports = {
  createProduct,
}
