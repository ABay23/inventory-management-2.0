import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
// import { useAuthStatus } from '../../redux/features/hooks/useAuthStatus'

const PrivateRoute = () => {
  // const { loggedIn, checkStatus } = useAuthStatus()
  const { isLoggedIn } = useSelector((state) => state.auth)

  return isLoggedIn ? <Outlet /> : <Navigate to={'/login'} />
}

export default PrivateRoute
