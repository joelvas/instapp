import { useDispatch } from 'react-redux/es/exports'
import { useEffect } from 'react'
import { authActions } from '../store/auth'
import jwtDecode from 'jwt-decode'
const useAuthChecker = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  const isAuthenticated = token && user
  useEffect(() => {
    if (isAuthenticated) {
      const decodedToken = jwtDecode(token)
      const expDate = new Date(Number(decodedToken.exp) * 1000)
      const nowDate = new Date()
      if (expDate - nowDate > 0) {
        dispatch(authActions.setToken(token))
        dispatch(authActions.setUser(JSON.parse(user)))
      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        dispatch(authActions.logout())
      }
    }
  }, [])

  return { isAuthenticated }
}
export default useAuthChecker
