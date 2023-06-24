import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/Card'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { loginUser, validateEmail } from '../../components/services/authService'
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice'

const initialState = {
  email: '',
  password: '',
}

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(initialState)

  const { email, password } = formData

  const handleImputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const login = async (e) => {
    e.preventDefault()

    //* Validate Fields
    if (!email || !password) {
      return toast.error('Please provide all the information')
    }

    //* Validate email
    if (!validateEmail(email)) {
      return toast.error('You must enter a valid email')
    }

    const userData = {
      email,
      password,
    }

    setIsLoading(true)

    try {
      const data = await loginUser(userData)
      // console.log(data)
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(data.name))
      navigate('/inventory')
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error.message)
    }
  }

  return (
    <div
    // classNameName=' container  flex-1'
    >
      <Card>
        <section className='bg-gradient-to-br from-gray-500 to-blue-400'>
          <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
            <Link className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
              <img
                className='w-8 h-8 mr-2'
                src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
                alt='logo'
              />
              INVENTORY MANAGEMENT 2.0
            </Link>
            <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
              <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                  Sign in to your account
                </h1>
                <form
                  className='space-y-4 md:space-y-6'
                  action='#'
                  onSubmit={login}
                >
                  <div>
                    <label
                      htmlFor='email'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Your email
                    </label>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='name@company.com'
                      required=''
                      value={email}
                      onChange={handleImputChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='password'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Password
                    </label>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      placeholder='••••••••'
                      className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      required=''
                      value={password}
                      onChange={handleImputChange}
                    />
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-start'>
                      <div className='flex items-center h-5'>
                        <input
                          id='remember'
                          aria-describedby='remember'
                          type='checkbox'
                          className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                          required=''
                        />
                      </div>
                      <div className='ml-3 text-sm'>
                        <label
                          htmlFor='remember'
                          className='text-gray-500 dark:text-gray-300'
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <Link
                      className='text-sm font-medium text-blue-400 hover:underline dark:text-primary-500'
                      to={'/forgot'}
                    >
                      Forgot password?
                    </Link>
                  </div>
                  {/* //*Button */}
                  <button
                    type='submit'
                    className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  >
                    Sign in
                  </button>
                  <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                    Don’t have an account yet?{' '}
                    <Link
                      to={'/register'}
                      className='font-medium text-blue-600 hover:underline dark:text-blue-500'
                    >
                      Sign up
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Card>
    </div>
  )
}

export default Login
