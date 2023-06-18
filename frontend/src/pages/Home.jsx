import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <section className='text-gray-400 body-font bg-white'>
        <div className='container px-5 py-24 mx-auto'>
          <div className='flex flex-wrap w-full mb-20 flex-col items-center text-center'>
            <h1 className=' pt-20 sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-500'>
              Inventory Management System
            </h1>
            <p className='lg:w-2/3 w-full leading-relaxed text-opacity-80 text-6xl font-sans text-cyan-700'>
              MVP for the NY Aquarium
            </p>
          </div>
          <div className='flex flex-wrap -m-4'>
            <div className='xl:w-1/3 md:w-1/2 p-4'>
              <div className='border border-gray-700 border-opacity-75 p-6 rounded-lg'>
                <div className='w-10 h-10 inline-flex items-center justify-center rounded-full bg-gray-800 text-blue-400 mb-4'>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='w-6 h-6'
                    viewBox='0 0 24 24'
                  >
                    <path d='M22 12h-4l-3 9L9 3l-3 9H2'></path>
                  </svg>
                </div>
                <h2 className='text-lg text-gray-500 font-medium title-font mb-2'>
                  Real Time Inventory
                </h2>
                <p className='leading-relaxed text-base'>
                  Take inventory and set pars from any device. Manage the
                  details like case size, order amount,
                </p>
              </div>
            </div>
            <div className='xl:w-1/3 md:w-1/2 p-4'>
              <div className='border border-gray-700 border-opacity-75 p-6 rounded-lg'>
                <div className='w-10 h-10 inline-flex items-center justify-center rounded-full bg-gray-800 text-blue-400 mb-4'>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='w-6 h-6'
                    viewBox='0 0 24 24'
                  >
                    <circle cx='6' cy='6' r='3'></circle>
                    <circle cx='6' cy='18' r='3'></circle>
                    <path d='M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12'></path>
                  </svg>
                </div>
                <h2 className='text-lg text-gray-500 font-medium title-font mb-2'>
                  One System for your Company
                </h2>
                <p className='leading-relaxed text-base'>
                  Eliminate IT costs and concerns associated with maintaining
                  and upgrading separate applications.
                </p>
              </div>
            </div>
            <div className='xl:w-1/3 md:w-1/2 p-4'>
              <div className='border border-gray-700 border-opacity-75 p-6 rounded-lg'>
                <div className='w-10 h-10 inline-flex items-center justify-center rounded-full bg-gray-800 text-blue-400 mb-4'>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='w-6 h-6'
                    viewBox='0 0 24 24'
                  >
                    <path d='M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2'></path>
                    <circle cx='12' cy='7' r='4'></circle>
                  </svg>
                </div>
                <h2 className='text-lg text-gray-500 font-medium title-font mb-2'>
                  Manage Multiple Locations
                </h2>
                <p className='leading-relaxed text-base'>
                  Manage independent inventory and Costs of Goods on multiple
                  venues. Increase efficiency on allocating common SKUs.
                </p>
              </div>
            </div>
          </div>
          <button className='flex mx-auto mt-16 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg'>
            <Link to={'/register'}>Register</Link>
          </button>
        </div>
      </section>
      <section className='text-gray-600 body-font py-20'>
        <div className='container mx-auto flex px-5 py-24 md:flex-row flex-col items-center'>
          <div className='lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center'>
            <h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
              Increase Productivity
              <br className='hidden lg:inline-block' />
              Generate KPIs
            </h1>
            <p className='mb-8 leading-relaxed'>
              An effective inventory management system can significantly enhance
              the productivity of managers and teams, while also generating
              additional revenue for your business.
              <br />
              With an accurate management system, your manager can make educated
              decisions about the operation, reduce waste and increase revenue
            </p>
            <div className='flex justify-center'>
              {/* <button className='inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg'>
                Button
              </button>
              <button className='ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg'>
                Button
              </button> */}
            </div>
          </div>
          <div className='lg:max-w-lg lg:w-full md:w-1/2 w-5/6'>
            <img
              className='object-cover object-center rounded'
              alt='hero'
              src='https://plus.unsplash.com/premium_photo-1664300447694-426b4b06675c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2970&q=80'
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Home
