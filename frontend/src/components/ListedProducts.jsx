import React, { useState } from 'react'
import Search from './Search'

const ListedProducts = ({ products }) => {
  const [search, setSearch] = useState('')

  return (
    <div
    // className='mt-20 pl-72 pr-5 z-10 sticky'
    >
      <hr />
      <span>
        <h3>Inventory Items</h3>
      </span>
      <span>
        <div className=' relative h-20 w-50'>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </span>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        {products.lenght === 0 ? (
          <p className=' text-md text-blue-600'>No Products Found</p>
        ) : (
          <table className='w-full justify-items-center text-sm text-center text-gray-500 dark:text-gray-500'>
            <thead className=' text-xsm text-white uppercase bg-gray-800'>
              <tr className=''>
                <th scope='col' className=' px-6 py-3'>
                  Nr.
                </th>
                <th scope='col' className=' px-6 py-3'>
                  Item
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
                  Inv. Value
                </th>
                <th scope='col' className=' px-6 py-3'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const { _id, name, image, category, price, quantity } = product

                return (
                  <tr
                    key={_id}
                    className=' text-center bg-white border-b dark:bg-gray-100 dark:border-gray-700'
                  >
                    <td className=' px-6 py-3'>{index + 1}</td>
                    <td className='px-6 py-3 '>
                      {' '}
                      <img
                        src={image.filePath}
                        alt='pic'
                        className='object-contain h-15 w-20'
                      />
                    </td>
                    <th
                      scope='row'
                      className=' px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-blue-600'
                    >
                      {name}
                    </th>
                    <td className=' px-6 py-3'>{category}</td>
                    <td className=' px-6 py-3'>
                      {'$'}
                      {price}
                    </td>

                    <td className=' px-6 py-3'>{quantity}</td>
                    <td className=' px-6 py-3'>
                      {'$'}
                      {price * quantity}
                    </td>
                    <td></td>
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
