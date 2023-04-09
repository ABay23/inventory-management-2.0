import { Link } from 'react-router-dom'
import { BsClipboardData } from 'react-icons/bs'

const Navbar = () => {
  return (
    <div className='fixed top-0 z-50 w-full'>
      <header class='text-gray-400 bg-gray-900 body-font'>
        <div class='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
          <a class='flex title-font font-medium items-center text-white mb-4 md:mb-0'>
            {/* <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              class='w-10 h-10 text-white p-2 bg-blue-500 rounded-full'
              viewBox='0 0 24 24'
            > */}
            {/* <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'></path>
            </svg> */}
            <BsClipboardData
              class='w-12 h-12 text-white p-2 bg-blue-500 rounded-full'
              viewBox='0 0 18 18 '
            />
            <span class='ml-3 text-xl'>IMS</span>
          </a>
          <nav class='md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center'>
            <ul class='flex'>
              <li class='mr-5 hover:text-white'>
                <Link to={'/'}>Home</Link>
              </li>
              <li class='mr-5 hover:text-white'>
                {' '}
                <Link to={'/inventory'}>Inventory</Link>
              </li>
              <li class='mr-5 hover:text-white'>
                {' '}
                <Link to={'/product'}>New Product</Link>
              </li>
              <li class='mr-5 hover:text-white'>
                {' '}
                <Link to={'/dashboard'}>Dashboard</Link>
              </li>
            </ul>
          </nav>
          <div class='flex justify-center'>
            <Link to={'/login'}>
              <button class='inline-flex items-center bg-gray-800 border-0 py-2 px-8 min-w-30 md:w-auto focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0 '>
                Login
              </button>
            </Link>
            <Link to={'/register'}>
              <button class='ml-4 inline-flex items-center bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0'>
                Register
              </button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar
