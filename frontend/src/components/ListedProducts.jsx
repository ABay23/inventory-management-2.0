import React from 'react'

const ListedProducts = ({ products }) => {
  return (
    <div className='mt-20 ml-30 z-10 sticky  container'>
      <hr />
      <div className=''>
        {products.lenght === 0 ? (
          <p className=' text-md text-blue-600'>No Products Found</p>
        ) : (
          <table className='text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className=' text-xsm text-gray-700 uppercase bg-gray-50'>
              <tr>
                <th scope='col' className=' px-6 py-3'>
                  Nr.
                </th>
                <th scope='col' className=' px-6 py-3'>
                  Name
                </th>
                <th scope='col' className=' px-6 py-3'>
                  Category
                </th>
                <th scope='col' className=' px-6 py-3'>
                  Price
                </th>
                <th scope='col' className=' px-6 py-3'>
                  Quantity
                </th>
                <th scope='col' className=' px-6 py-3'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const { _id, name, category, price, quantity } = product

                return (
                  <tr key={_id}>
                    <td className=' px-6 py-3'>{index + 1}</td>
                    <th scope='row' className=' px-6 py-3'>
                      {name}
                    </th>
                    <td className=' px-6 py-3'>{category}</td>
                    <td className=' px-6 py-3'>{price}</td>
                    <td className=' px-6 py-3'>{quantity}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default ListedProducts
