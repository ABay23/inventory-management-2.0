import React, { useEffect, useState } from 'react'
import Search from './Search'
import { useDispatch, useSelector } from 'react-redux'
import { BsInfoCircleFill, BsPencil } from 'react-icons/bs'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import {
  FILTER_PRODUCTS,
  selectFilteredProducts,
} from '../redux/features/product/filterSlice'

import ReactPaginate from 'react-paginate'
import {
  deleteProduct,
  getAllProducts,
} from '../redux/features/product/productSlice'
import { Link } from 'react-router-dom'

const ListedProducts = ({ products }) => {
  const [search, setSearch] = useState('')
  const filteredProducts = useSelector(selectFilteredProducts)

  const dispatch = useDispatch()

  //* Delete Products

  const delProduct = async (id) => {
    await dispatch(deleteProduct(id))
    await dispatch(getAllProducts())
  }

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete Product',
      message: 'Are you sure you want to delete the Product?.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => delProduct(id),
        },
        {
          label: 'Cancel',
          // onClick: () => alert('Click No'),
        },
      ],
    })
  }

  //* Start Pagination
  const [currentItems, setCurrentItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 8

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage))
  }, [itemOffset, itemsPerPage, filteredProducts])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length
    setItemOffset(newOffset)
  }
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }))
  }, [products, search, dispatch])

  return (
    <div
    // className='mt-20 pl-72 pr-5 z-10 sticky'
    >
      <hr />
      <span>
        <h3 className=' text-2xl text-blue-800  font-bold '>Inventory Items</h3>
      </span>
      <span>
        <div className=' relative h-20 w-50'>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </span>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        {filteredProducts.length === 0 ? (
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
              {currentItems.map((product, index) => {
                const { _id, name, image, category, price, quantity } = product

                return (
                  <tr
                    key={_id}
                    className=' text-center bg-white border-b dark:bg-gray-100 dark:border-gray-700'
                  >
                    <td className=' px-6 py-3'>{index + 1}</td>

                    <td className=' h-20 w-36 px-6 py-3 '>
                      {image != null ? (
                        <img
                          src={image.filePath}
                          alt='pic'
                          className='h-20 w-20 object-contain mx-auto'
                        />
                      ) : (
                        <p className=' text-orange-500'>
                          No Image set for this product
                        </p>
                      )}
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
                    <td className=' flex px-6 py-3 justify-evenly mt-5 items-center'>
                      <Link to={`/product-detail/${_id}`}>
                        <BsInfoCircleFill className=' h-5 w-5 text-blue-500 cursor-pointer' />
                      </Link>
                      <Link to={`/edit-product/${_id}`}>
                        <BsPencil className=' h-5 w-5 text-grey-500 cursor-pointer' />{' '}
                      </Link>
                      <RiDeleteBin2Fill
                        className=' h-6 w-6 text-red-500 cursor-pointer'
                        onClick={() => confirmDelete(_id)}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className='flex flex-row align-middle items-center place-content-center '>
        {/* <Items currentItems={currentItems} /> */}
        <ReactPaginate
          breakLabel='...'
          nextLabel='Next'
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel='Prev'
          renderOnZeroPageCount={null}
          containerClassName='inline-flex items-center h-10 '
          pageLinkClassName='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          previousLinkClassName=' px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          nextLinkClassName=' px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          activeLinkClassName='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
        />
      </div>
    </div>
  )
}

export default ListedProducts
