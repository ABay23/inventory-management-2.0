import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Card from '../../components/Card'
import {
  registerUser,
  validateEmail,
} from '../../components/services/authService'
import { useDispatch } from 'react-redux'
import {
  SET_LOGIN,
  SET_NAME,
  SET_USER,
} from '../../redux/features/auth/authSlice'

const initialState = {
  name: '',
  email: '',
  password: '',
  password2: '',
}

function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(initialState)

  const { name, email, password, password2 } = formData

  const handleImputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const register = async (e) => {
    e.preventDefault()

    //* Validate Fields
    if (!name || !email || !password) {
      return toast.error('Please provide all the information')
    }

    //* Validate Password

    if (password !== password2) {
      return toast.error('Passwords do not match')
    }
    //* Validate Pass Lenght

    if (password.length < 6) {
      return toast.error('Passwords must be at least 6 characters')
    }

    //* Validate email
    if (!validateEmail(email)) {
      return toast.error('You must enter a valid email')
    }

    //* Register User

    const userData = {
      name,
      email,
      password,
    }

    setIsLoading(true)

    try {
      const data = await registerUser(userData)
      // console.log(data)
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(data.name))
      navigate('/dashboard')
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
        <section className='bg-gray-50 dark:bg-blue-400'>
          <div className='flex flex-col mt-20 items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
            <a
              href='#'
              className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
            >
              <img
                className='w-8 h-8 mr-2'
                src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
                alt='logo'
              />
              BRAND GOES HERE
            </a>
            <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
              <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                  Create your account
                </h1>
                <form
                  className='space-y-4 md:space-y-6'
                  action='#'
                  onSubmit={register}
                >
                  <div>
                    <label
                      for='name'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Your name
                    </label>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      value={name}
                      onChange={handleImputChange}
                      className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='name'
                      required=''
                    />
                  </div>
                  <div>
                    <label
                      for='email'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Your email
                    </label>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      value={email}
                      onChange={handleImputChange}
                      className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='name@company.com'
                      required=''
                    />
                  </div>
                  <div>
                    <label
                      for='password'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Password
                    </label>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      value={password}
                      onChange={handleImputChange}
                      placeholder='••••••••'
                      className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      required=''
                    />
                  </div>
                  <div>
                    <label
                      for='password'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Password
                    </label>
                    <input
                      type='password'
                      name='password2'
                      id='password2'
                      value={password2}
                      onChange={handleImputChange}
                      placeholder='••••••••'
                      className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      required=''
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
                          for='remember'
                          className='text-gray-500 dark:text-gray-300'
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <a
                      href='#'
                      className='text-sm font-medium text-blue-400 hover:underline dark:text-primary-500'
                    >
                      <Link to={'/forgot'}>Forgot password?</Link>
                    </a>
                  </div>
                  <button
                    type='submit'
                    className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  >
                    Register
                  </button>
                  <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                    Don’t have an account yet?{' '}
                    <a
                      href='#'
                      className='font-medium text-blue-600 hover:underline dark:text-blue-500'
                    >
                      <Link to={'/register'}>Sign up</Link>
                    </a>
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

export default Register
