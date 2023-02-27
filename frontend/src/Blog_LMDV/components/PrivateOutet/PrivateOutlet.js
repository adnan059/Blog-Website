

import React, { useContext } from 'react'
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from '../../context/Context'

export const PrivateOutlet1 = () => {
  const {user} = useContext(AuthContext)

  return (
    user? <Outlet/> : <Navigate to="/login" />
  )
}

export const PrivateOutlet2 = () => {
  const {user} = useContext(AuthContext)
    return (
        user? <Navigate to="/"/> : <Outlet/>
    )
}

