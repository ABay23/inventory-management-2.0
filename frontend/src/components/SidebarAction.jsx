import React from 'react'
import { HiMenuAlt3 } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const SidebarAction = () => {
  return (
    <section className='flex gap-6'>
      <div className='bg-gray-900 min-h-screen w-72 text-gray-200'>
        <div className='py-3 flex justify-end'>
          <HiMenuAlt3 size={26} className='cursor-pointer' />
        </div>
        <ul>
          <Link to={'/'}>
            <li className=' text-white '>Home</li>
          </Link>
        </ul>
      </div>
    </section>
  )
}

export default SidebarAction
