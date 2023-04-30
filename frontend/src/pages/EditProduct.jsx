import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getAllProducts,
  getProduct,
  selectProduct,
  updateProduct,
} from '../redux/features/product/productSlice'

const EditProduct = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productEdit = useSelector(selectProduct)

  const [product, setProduct] = useState(productEdit)
  const [productImage, setProductImage] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    dispatch(getProduct(id))
  }, [dispatch, id])

  useEffect(() => {
    setProduct(productEdit)

    setImagePreview(
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
    )

    setDescription(
      productEdit && productEdit.description ? productEdit.description : ''
    )
  }, [productEdit])

  const handleImputChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }

  const saveProduct = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', product?.name)
    formData.append('category', product?.category)
    formData.append('quantity', Number(product?.quantity))
    formData.append('price', product?.price)
    formData.append('description', description)

    if (productImage) {
      formData.append('image', productImage)
    }

    console.log(...formData)

    await dispatch(updateProduct({ id, formData }))
    await dispatch(getAllProducts())

    navigate('/inventory')
  }

  return (
    <div>
      <section className='bg-white dark:bg-gray-500 mt-20 h-full'>
        <div className=' py-8 px-4 mx-auto max-w-2xl lg:py-16'>
          <h2 className='mb-4 text-xl font-bold text-gray-900 dark:text-white'>
            Add a new product
          </h2>
          <form action='#' className='' onSubmit={saveProduct}>
            <div className='flex grid gap-4 sm:grid-cols-2 sm:gap-6 my-8'>
              <div className='sm:col-span-2'>
                <label
                  htmlFor='name'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Product Name
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={product?.name}
                  onChange={handleImputChange}
                  className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  placeholder='Type product name'
                  required=''
                />
              </div>
              <div className='w-full'>
                <label
                  htmlFor='brand'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  {/* [Working on adding Vendor Code to the DB]  */}
                  Vendor Item Code
                </label>
                <input
                  type='text'
                  name='vcode'
                  id='vcode'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  placeholder='Vendor Code'
                  // required=''
                />
              </div>
              <div className='w-full'>
                <label
                  htmlFor='price'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Price
                </label>
                <input
                  type='number'
                  name='price'
                  id='price'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  placeholder='$200.00'
                  required=''
                  value={product?.price}
                  onChange={handleImputChange}
                />
              </div>
              <div>
                <label
                  htmlFor='category'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Category
                </label>
                <select
                  // onChange={handleImputChange}
                  id='category'
                  value={product?.category}
                  onChange={(e) => setCategory(e.target.value)}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500'
                >
                  <option defaultValue=''>Select category</option>
                  <option value='Food'>Food</option>
                  <option value='Paper'>Paper</option>
                  {/* <option value='DS'>Dry Storage</option>
                  <option value='FG'>Fridge</option>
                  <option value='DT'>Depot</option> */}
                </select>
              </div>
              <div>
                <label
                  htmlFor='item-weight'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Inventory Count
                </label>
                <input
                  type='number'
                  name='quantity'
                  id='quantity'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  placeholder='12'
                  required=''
                  value={product?.quantity}
                  onChange={handleImputChange}
                />
              </div>
              <div className='sm:col-span-2'>
                <label
                  htmlFor='description'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Description
                </label>
                <textarea
                  type='text'
                  id='description'
                  name='description'
                  rows='8'
                  className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  placeholder='Your description here'
                  value={product?.description}
                  onChange={(e) => setDescription(e.target.value)}
                  required=''
                ></textarea>
              </div>
              <div>
                <label
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  htmlFor='file_input'
                >
                  Upload Item Image
                </label>
                <input
                  className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                  aria-describedby='file_input_help'
                  id='file_input'
                  name='image'
                  type='file'
                  onChange={(e) => handleImageChange(e)}
                />
                <p
                  className='mt-1 text-sm text-gray-500 dark:text-gray-300'
                  id='file_input_help'
                >
                  SVG, PNG, JPG or GIF (MAX. 800x400px).
                </p>
                {imagePreview != null ? (
                  <div className='lg:max-w-lg lg:w-full md:w-1/2 w-5/6'>
                    <img
                      className='object-cover object-center rounded'
                      src={imagePreview}
                      alt='Product'
                    />
                  </div>
                ) : (
                  <p className=' text-orange-500'>
                    No Image set for this product
                  </p>
                )}
              </div>
            </div>
            <button
              type='submit'
              className='w-50  text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              // className='inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800'
            >
              Update Product
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default EditProduct
