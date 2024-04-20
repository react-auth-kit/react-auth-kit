import React from 'react'
import { Route, Routes } from 'react-router-dom'

import RequireAuth from '@auth-kit/react-router/RequireAuth'

import Home from './componants/Home'
import Login from './componants/Login'
import Secure from './componants/Secure'

const RoutesPage = () => {
  return (
        <Routes>
          <Route path={'/'} element={<Home/>}/>
          <Route path={'/login' } element={<Login/>}/>
          <Route path={'/secure'} element={
            <RequireAuth fallbackPath={'/login'}>
              <Secure/>
            </RequireAuth>
          }/>
        </Routes>
  )
}

export default RoutesPage
