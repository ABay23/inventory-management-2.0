import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
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

axios.defaults.withCredentials = true

function App() {
  return (
    <>
      <div className='box-border'>
        <div className='flex flex-col'>
          <Router>
            <ToastContainer />
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/forgot' element={<Forgot />} />
              <Route path='/reset' element={<Reset />} />
              <Route path='/inventory' element={<PrivateRoute />}>
                <Route
                  path='/inventory'
                  element={[<Sidebar />, <Inventory />]}
                />
              </Route>
              <Route path='/dashboard' element={<PrivateRoute />}>
                <Route
                  path='/dashboard'
                  element={[<Sidebar />, <Dashboard />]}
                />
              </Route>
              <Route path='/product' element={<PrivateRoute />}>
                <Route
                  path='/product'
                  element={[<Sidebar />, <AddProduct />]}
                />
              </Route>
              <Route path='/product-detail/:id' element={<PrivateRoute />}>
                <Route
                  path='/product-detail/:id'
                  element={[<Sidebar />, <ProductDetails />]}
                />
              </Route>
              {/* <Route path='/dashboard' element={[<Sidebar />, <Dashboard />]} /> */}
              {/* <Route path='/product' element={[<Sidebar />, <AddProduct />]} /> */}
              {/* <Route
                path='/product-detail/:id'
                element={[<Sidebar />, <ProductDetails />]}
              /> */}
            </Routes>
          </Router>
        </div>
      </div>
    </>
  )
}

export default App
