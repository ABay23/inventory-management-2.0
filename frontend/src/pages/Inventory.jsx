import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../redux/features/auth/authSlice'
import { getAllProducts } from '../redux/features/product/productSlice'
import ListedProducts from '../components/ListedProducts'

const Inventory = () => {
  const dispatch = useDispatch()

  const isLoggedIn = useSelector(selectIsLoggedIn)

  const { products, isError, message } = useSelector((state) => state.product)

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllProducts())
    }
    // console.log(products)

    if (isError) {
      console.log(message)
    }
  }, [isLoggedIn, isError, message, dispatch])

  return (
    <div className=' mt-40 pl-72 pr-5 z-10 static'>
      <h2>Top KPIS</h2>

      <ListedProducts products={products} />
    </div>
  )
}

export default Inventory
