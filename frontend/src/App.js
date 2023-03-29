import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
function App() {
  return (
    <>
      <div className='box-border'>
        <div className='flex flex-col'></div>

        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
