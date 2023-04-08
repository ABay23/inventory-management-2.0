import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import AddProduct from './pages/AddProduct'
import Forgot from './pages/auth/Forgot'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Reset from './pages/auth/Reset'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Inventory from './pages/Inventory'
function App() {
  return (
    <>
      <div className='box-border'>
        <div className='flex flex-col'></div>

        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot' element={<Forgot />} />
            <Route path='/reset' element={<Reset />} />
            <Route path='/inventory' element={<Inventory />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/product' element={<AddProduct />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
