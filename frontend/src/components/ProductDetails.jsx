import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectIsLoggedIn } from '../redux/features/auth/authSlice'
import { getProduct } from '../redux/features/product/productSlice'
import DOMPurify from 'dompurify'

const ProductDetails = () => {
  const dispatch = useDispatch()

  const { id } = useParams()

  const isLoggedIn = useSelector(selectIsLoggedIn)
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  )
  console.log(product)

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
    <div className=' ml-80 mt-32'>
      <h2>{id}</h2>
      <div>
        {product?.image ? (
          <img src={product.image.filePath} alt={product.image.fileName} />
        ) : (
          <p>No image set for this product</p>
        )}
      </div>
      <section className='bg-white dark:bg-gray-500 mt-20 h-full'>
        <div className=' py-8 px-4 mx-auto max-w-2xl lg:py-16'>
          <h2 className='mb-4 text-xl font-bold text-gray-900 dark:text-white'>
            Add a new product
          </h2>
          <h4>Product Availability: </h4>
          <hr />
          <h4>
            <span className='badge'>Name: </span> &nbsp; {product.name}
          </h4>
          <p>
            <b>&rarr; SKU : </b> {product.sku}
          </p>
          <p>
            <b>&rarr; Category : </b> {product.category}
          </p>
          <p>
            <b>&rarr; Price : </b> {'$'}
            {product.price}
          </p>
          <p>
            <b>&rarr; Quantity in stock : </b> {product.name}
          </p>
          <p>
            <b>&rarr; Total Value in stock : </b> {'$'}
            {product.price * product.price}
          </p>
          <hr />
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.description),
            }}
          ></div>
        </div>
      </section>
    </div>
  )
}

export default ProductDetails
