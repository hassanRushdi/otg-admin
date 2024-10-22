import React from 'react'
import { Outlet } from 'react-router-dom'

const Auth = () => {
  return (
    <div className="app__auth  " >
      <Outlet/>
    </div>
  )
}

export default Auth
