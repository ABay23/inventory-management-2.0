import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// import { selectUser } from '../auth/authSlice'

export const useAuthStatus = () => {
  const [xloggedIn, setXloggedIn] = useState(false)
  // const [checkStatus, setCheckStatus] = useState(true)

  const { isLoggedIn } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isLoggedIn) {
      setXloggedIn(true)
    } else {
      setXloggedIn(false)
    }
    // setCheckStatus(false)
  }, [isLoggedIn])

  return { xloggedIn }
}
