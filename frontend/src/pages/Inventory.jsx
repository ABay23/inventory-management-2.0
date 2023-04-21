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
    <div>
      <h2>Inventory</h2>
      <ListedProducts products={products} />

      <div>
        <hr />
        <div className=' table-fixed '>
          {products.length === 0 ? (
            <p className=' text-md text-blue-600'>No Products Found</p>
          ) : (
            <table className=' w-auto text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead className=' text-xsm text-gray-700 uppercase bg-gray-50'>
                <tr>
                  <th className=' px-6 py-3'>Nr.</th>
                  <th className=' px-6 py-3'>Name</th>
                  <th className=' px-6 py-3'>Category</th>
                  <th className=' px-6 py-3'>Price</th>
                  <th className=' px-6 py-3'>Quantity</th>
                  <th className=' px-6 py-3'>Name</th>
                  <th className=' px-6 py-3'>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  const { _id, name, category, price, quantity } = product

                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{name}</td>
                      <td>{category}</td>
                      <td>{price}</td>
                      <td>{quantity}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default Inventory
