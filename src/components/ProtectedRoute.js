import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute({userIndex}) {
  if (userIndex.length <= 0) {
    return <Navigate to={'/login'} />
  }
  return <Outlet />
}
