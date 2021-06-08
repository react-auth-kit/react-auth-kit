import React from 'react'
import { PrivateRoute } from 'react-auth-kit'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import SecureComponent from './components/SecureComponent'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={'/'} component={Home} exact/>
                <Route path={'/login' } component={Login} exact/>
                <PrivateRoute path={'/secure'} component={SecureComponent} loginPath={'/login'} exact/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes