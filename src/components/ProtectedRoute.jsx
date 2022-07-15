import React from 'react'
import { Navigate } from 'react-router-dom'
const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (isAuthenticated) {
    return children
  } else {
    return <Navigate to="/login" replace />
  }
}
export default ProtectedRoute
