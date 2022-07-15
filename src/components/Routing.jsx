import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import Home from '../pages/Home'
import Authentication from '../pages/Authentication'
import Profile from '../pages/Profile'
const Routing = ({ isAuthenticated }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Home />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to={'/'} replace /> : <Authentication />
        }
      ></Route>
      <Route
        path="/profile"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Profile />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  )
}
export default Routing
