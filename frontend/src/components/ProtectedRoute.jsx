import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, roles = [] }) => {
  const { token, user } = useSelector(state => state.auth)

  if (!token) {
    return <Navigate to="/login" />
  }

  if (roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/dashboard" />
  }

  return children
}

export default ProtectedRoute