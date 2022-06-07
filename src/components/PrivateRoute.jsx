import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'

const PrivateRoute = () => {
  // loggedIn, checkingStatus come from custom hook useAuthStatus
  const { loggedIn, checkingStatus } = useAuthStatus()
  if (checkingStatus) {
    return <Spinner />
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />
}
// return child (Profile) when logged in, if not navigate to /sign-in
export default PrivateRoute
