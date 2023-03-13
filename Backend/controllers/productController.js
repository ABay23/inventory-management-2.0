const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, price, quantity, description } = req.body

  //* Validation
  if (!name || !category || !price || !description) {
    res.status(400)
    throw new Error('Please fill in all the fields')
  }

  const product = await Product.create({
    user: req.user._id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
  })
  res.status(201).json(product)
})

module.exports = {
  createProduct,
}
