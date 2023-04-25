import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../redux/features/auth/authSlice'
import { getAllProducts } from '../redux/features/product/productSlice'
import ListedProducts from '../components/ListedProducts'
import DashboardBox from '../components/dashboard/DashboardBox'

const Inventory = () => {
  const dispatch = useDispatch()

  const isLoggedIn = useSelector(selectIsLoggedIn)

  const { products, isError, message } = useSelector((state) => state.product)

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getAllProducts())
    }
    console.log(isLoggedIn)

    if (isError) {
      console.log(message)
    }
  }, [isError, isLoggedIn, message, dispatch])

  return (
    <div className=' mt-40 pl-72 pr-5 z-10 static'>
      <DashboardBox products={products} />

      <ListedProducts products={products} />
    </div>
  )
}

export default Inventory
