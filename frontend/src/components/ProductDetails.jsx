import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectIsLoggedIn } from '../redux/features/auth/authSlice'
import { getProduct } from '../redux/features/product/productSlice'
import DOMPurify from 'dompurify'
import { FaArrowLeft } from 'react-icons/fa'

const ProductDetails = () => {
  const dispatch = useDispatch()

  const { id } = useParams()

  const isLoggedIn = useSelector(selectIsLoggedIn)
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  )
  // console.log(product)

  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className='--color-success'>In Stock</span>
    }
    return <span className='--color-danger'>Out Of Stock</span>
  }

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id))
    }

    if (isError) {
      console.log(message)
    }
  }, [id, isLoggedIn, isError, message, dispatch])

  return (
    <div className=' flex flex-col w-screen h-screen bg-gradient-to-br items-center from-gray-600 to-blue-400'>
      <div className='flex flex-row justify-evenly w-2/3 h-2/3 mx-20 mt-40 bg-gray-500 pt-10 px-4 rounded-xl'>
        <button
          className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 h-12 w-20 rounded inline-flex items-center'
          onClick={() => goBack()}
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>
        <section className=' h-36 w-52  mt-16'>
          <h2 className=' text-lg font-bold w-32'>ID: {id}</h2>
          <div className=' '>
            {product?.image ? (
              <img
                src={product.image.filePath}
                alt={product.image.fileName}
                className='object-cover object-center rounded'
              />
            ) : (
              <p className=' text-3xl font-bold text-orange-500'>
                No image set for this product
              </p>
            )}
          </div>
        </section>
        <section className=' mt-16 ml-4 w-2/4 '>
          <div className=' py-4 px-4 mx-auto max-w-2xl lg:py-4'>
            <h2 className='mb-4 text-xl font-bold text-gray-900 dark:text-white'>
              Product Details
            </h2>

            <hr />
            <h4>
              <span className=' font-bold text-lg'>Name: {product?.name} </span>
            </h4>
            <p className=' w-80 bg-blue-400 rounded-md py-1 px-2 my-2'>
              <b>&rarr; SKU : </b> {product?.sku}
            </p>
            <p className=' w-80 bg-blue-400 rounded-md py-1 px-2 my-2'>
              <b>&rarr; Category : </b> {product?.category}
            </p>
            <p className=' w-80 bg-blue-400 rounded-md py-1 px-2 my-2'>
              <b>&rarr; Price : </b> {'$'}
              {product?.price}
            </p>
            <p className=' w-80 bg-blue-400 rounded-md py-1 px-2 my-2'>
              <b>&rarr; Quantity in stock : </b> {product?.quantity}
            </p>
            <p className=' w-80 bg-blue-400 rounded-md py-1 px-2 my-2'>
              <b>&rarr; Total Value in stock : </b> {'$'}
              {product?.quantity * product?.price}
            </p>
            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product?.description),
              }}
            ></div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ProductDetails
