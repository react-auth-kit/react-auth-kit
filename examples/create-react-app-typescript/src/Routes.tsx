import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import RequireAuth from 'react-auth-kit/PrivateRoute'

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
                  <RequireAuth loginPath={'/login'}>
                    <SecureComponent/>
                  </RequireAuth>
                }/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesComponent
