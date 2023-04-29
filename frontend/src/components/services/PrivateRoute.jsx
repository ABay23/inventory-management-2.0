import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../../redux/features/hooks/useAuthStatus'

const PrivateRoute = () => {
  const { loggedIn, checkStatus } = useAuthStatus()
  return loggedIn ? <Outlet /> : <Navigate to={'/login'} />
}

export default PrivateRoute
