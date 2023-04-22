import React from 'react'
import { BiSearch } from 'react-icons/bi'

const Search = ({ value, onChange }) => {
  return (
    <div className='flex  place-content-end'>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 '>
          <BiSearch size={20} />
        </div>
        <input
          type='text'
          id='table-search'
          className=' right-0 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Search for items'
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default Search
