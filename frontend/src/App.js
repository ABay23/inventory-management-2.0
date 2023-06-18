import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import AddProduct from './pages/AddProduct'
import Forgot from './pages/auth/Forgot'
import Register from './pages/auth/Register'
import Reset from './pages/auth/Reset'
import Login from './pages/auth/Login'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Inventory from './pages/Inventory'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProductDetails from './components/ProductDetails'
import PrivateRoute from './components/services/PrivateRoute'
import EditProduct from './pages/EditProduct'

axios.defaults.withCredentials = true

function App() {
  return (
    <>
      <div className='w-full h-full overflow-x-hidden overflow-y-auto'>
        <Router>
          <ToastContainer />
          <Navbar />
          <div className='  '>
            <div className=' flex flex-col'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/forgot' element={<Forgot />} />
                <Route path='/reset' element={<Reset />} />
              </Routes>
            </div>
          </div>
          <div>
            <div>
              <Routes>
                <Route path='/inventory' element={<PrivateRoute />}>
                  <Route path='/inventory' element={<Inventory />} />
                </Route>
                <Route path='/dashboard' element={<PrivateRoute />}>
                  <Route path='/dashboard' element={<Dashboard />} />
                </Route>
                <Route path='/product' element={<PrivateRoute />}>
                  <Route path='/product' element={<AddProduct />} />
                </Route>
                <Route path='/product-detail/:id' element={<PrivateRoute />}>
                  <Route
                    path='/product-detail/:id'
                    element={<ProductDetails />}
                  />
                </Route>
                <Route path='/edit-product/:id' element={<PrivateRoute />}>
                  <Route path='/edit-product/:id' element={<EditProduct />} />
                </Route>
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </>
  )
}

export default App
