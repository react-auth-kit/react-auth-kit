/*
 * Copyright 2020 Arkadip Bhattacharya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
