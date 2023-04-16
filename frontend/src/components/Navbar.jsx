import { Link, useNavigate } from 'react-router-dom'
import { BsClipboardData } from 'react-icons/bs'
import {
  SET_LOGIN,
  SET_LOGOUT,
  selectIsLoggedIn,
  selectUser,
} from '../redux/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from './services/authService'

const Navbar = () => {
  // const { user } = useSelector((state) => state.auth)
  const { isLoggedIn } = useSelector((state) => state.auth)
  // const { user } = useSelector(selectUser)
  // const { user } = useSelector(selectIsLoggedIn)
  // const loggedIn = SET_LOGIN

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = async () => {
    await logOutUser()
    await dispatch(SET_LOGIN(false))
    dispatch(SET_LOGOUT(true))
    navigate('/')
    console.log(isLoggedIn)
  }

  return (
    <div className='fixed top-0 z-50 w-full'>
      <header className='text-gray-400 bg-gray-900 body-font'>
        <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
          <Link className='flex title-font font-medium items-center text-white mb-4 md:mb-0'>
            <BsClipboardData
              className='w-12 h-12 text-white p-2 bg-blue-500 rounded-full'
              viewBox='0 0 18 18 '
            />
            <span className='ml-3 text-xl'>IMS</span>
          </Link>
          <nav className='md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center'>
            <ul className='flex'>
              <li className='mr-5 hover:text-white'>
                <Link to={'/'}>Home</Link>
              </li>
              <li className='mr-5 hover:text-white'>
                {' '}
                <Link to={'/inventory'}>Inventory</Link>
              </li>
              <li className='mr-5 hover:text-white'>
                {' '}
                <Link to={'/product'}>New Product</Link>
              </li>
              <li className='mr-5 hover:text-white'>
                {' '}
                <Link to={'/dashboard'}>Dashboard</Link>
              </li>
            </ul>
          </nav>
          <ul>
            {isLoggedIn ? (
              <div className='flex justify-center'>
                <button
                  className='inline-flex items-center bg-blue-800 border-0 py-2 px-8 min-w-30 md:w-auto focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0 '
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <div className='flex justify-center'>
                  <Link to={'/login'}>
                    <button className='inline-flex items-center bg-gray-800 border-0 py-2 px-8 min-w-30 md:w-auto focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0 '>
                      Login
                    </button>
                  </Link>
                  <Link to={'/register'}>
                    <button className='ml-4 inline-flex items-center bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0'>
                      Register
                    </button>
                  </Link>
                </div>
              </>
            )}
          </ul>
        </div>
      </header>
    </div>
  )
}

export default Navbar
