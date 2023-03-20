const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const { fileSizeFormatter } = require('../utility/fileUpload')
const cloudinary = require('cloudinary').v2

const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, price, quantity, description } = req.body

  //* Validation
  if (!name || !category || !price || !description) {
    res.status(400)
    throw new Error('Please fill in all the fields')
  }

  // //* Handle image upload
  let fileData = {}

  if (req.file) {
    let uploadedFile

    try {
      uploadedFile = await cloudinary.uploader.upload(
        //* File Path
        req.file.path,
        { folder: 'inventory-2.0', resource_type: 'image' }
      )
    } catch (error) {
      res.status(500)
      throw new Error('Image could not be uploaded')
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      filetype: req.file.mimetype,
      fileSise: fileSizeFormatter(req.file.size, 2),
    }
  }

  const product = await Product.create({
    user: req.user.id,
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

//* Get all Product

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.id })
  res.status(200).json(products).sort('-createdAt')
})

//*  Get Single Product
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  //* Validate product exist
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  //* Match Product  with user
  if (product.user.toString() !== req.user.id) {
    res.status(404)
    throw new Error('User not found')
  } else {
    res.status(200).json(product)
  }
})

//* Delete Single Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  //   //* Validate product exist
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  //   //* Match Product  with user
  if (product.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not found')
  }
  await product.deleteOne({ id: req.params.id })
  res.status(200).json({ message: 'Product Removed' })
})

// const deleteProduct = asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id)
//   try {
//     // if product doesnt exist
//     if (!product) {
//       res.status(404)
//       throw new Error('Product not found')
//     }

//     // Match product to its user
//     if (product.user.toString() !== req.user.id) {
//       res.status(401)
//       throw new Error('User not authorized')
//     }
// if (product) {
//   try {
//     await product.remove()
//     res.status(200).json({ message: 'Product deleted.' })
//   } catch (error) {
//     console.log(error)
//   }
// }
// const pr = await product
//   await product.remove()
//   res.status(200).json({ message: 'ok' })
// } catch (error) {
//   console.log(error)
// }
// })

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
}
