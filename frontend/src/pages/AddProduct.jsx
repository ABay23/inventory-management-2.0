import React, { useState } from 'react'
import { createProduct } from '../redux/features/product/productSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const initialState = {
  name: '',
  category: '',
  quantity: '',
  price: '',
}

const AddProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [product, setProduct] = useState(initialState)
  const [productImage, setProductImage] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const [description, setDescription] = useState('')

  const { name, category, quantity, price } = product

  const handleImputChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }

  //* Generate SKU Temporary option to simplify MVP testing

  const createSKU = (category) => {
    const letters = category.slice(0, 3).toUpperCase()
    const numbers = Date.now()
    const sku = letters + '-' + numbers
    return sku
  }

  const saveProduct = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('sku', createSKU)
    formData.append('category', category)
    formData.append('quantity', quantity)
    formData.append('price', price)
    formData.append('description', description)
    formData.append('image', productImage)

    console.log(...formData)

    await dispatch(createProduct(formData))

    navigate('/dashboard')
  }

  return (
    <div>
      <section className='bg-white dark:bg-gray-500 mt-20'>
        <div className=' py-8 px-4 mx-auto max-w-2xl lg:py-16'>
          <h2 className='mb-4 text-xl font-bold text-gray-900 dark:text-white'>
            Add a new product
          </h2>
          <form action='#' className=''>
            <div className='flex grid gap-4 sm:grid-cols-2 sm:gap-6 my-8'>
              <div className='sm:col-span-2'>
                <label
                  for='name'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Product Name
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  placeholder='Type product name'
                  required=''
                />
              </div>
              <div className='w-full'>
                <label
                  for='brand'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Brand
                </label>
                <input
                  type='text'
                  name='brand'
                  id='brand'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  placeholder='Product brand'
                  required=''
                />
              </div>
              <div className='w-full'>
                <label
                  for='price'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Price
                </label>
                <input
                  type='number'
                  name='price'
                  id='price'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  placeholder='$2999'
                  required=''
                />
              </div>
              <div>
                <label
                  for='category'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Category
                </label>
                <select
                  id='category'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                >
                  <option selected=''>Select category</option>
                  <option value='TV'>TV/Monitors</option>
                  <option value='PC'>PC</option>
                  <option value='GA'>Gaming/Console</option>
                  <option value='PH'>Phones</option>
                </select>
              </div>
              <div>
                <label
                  for='item-weight'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Item Weight (kg)
                </label>
                <input
                  type='number'
                  name='item-weight'
                  id='item-weight'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  placeholder='12'
                  required=''
                />
              </div>
              <div className='sm:col-span-2'>
                <label
                  for='description'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Description
                </label>
                <textarea
                  id='description'
                  rows='8'
                  className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  placeholder='Your description here'
                ></textarea>
              </div>
              <div>
                <label
                  class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  for='file_input'
                >
                  Upload Item Image
                </label>
                <input
                  class='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                  aria-describedby='file_input_help'
                  id='file_input'
                  type='file'
                />
                <p
                  class='mt-1 text-sm text-gray-500 dark:text-gray-300'
                  id='file_input_help'
                >
                  SVG, PNG, JPG or GIF (MAX. 800x400px).
                </p>
              </div>
            </div>
            <button
              type='submit'
              className='w-50  text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              // className='inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800'
            >
              Add product
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default AddProduct
