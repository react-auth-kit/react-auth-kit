import React from 'react'
import RequireAuth from '@auth-kit/react-router/RequireAuth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import SecureComponent from './components/SecureComponent'

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/login' } element={<Login/>}/>
        <Route path={'/secure'} element={
          <RequireAuth fallbackPath={'/login'}>
            <SecureComponent/>
          </RequireAuth>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesComponent
