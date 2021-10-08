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
import {useIsAuthenticated, useSignIn} from 'react-auth-kit'
import {Redirect, useHistory} from 'react-router-dom'

const Login = () => {
  const isAuthenticated = useIsAuthenticated()
  const signIn = useSignIn()
  const history = useHistory()

  /**
   * Login Handle, the callback function onClick from the "Login" button
   *
   * This function demostrate a dummy authentication, using useSignIn function
   */
  const loginHandler = () => {
    // Assuming that, all network Request is successfull, and the user is authenticated

    if (signIn({
      token: '35v3443bn368367n306306wbn407qn420b436b4', //Just a random token
      tokenType: 'Bearer',    // Token type set as Bearer
      authState: {name: 'React User', uid: 123456},   // Dummy auth user state
      expiresIn: 10,  // Token Expriration time, in minutes
      refreshToken: '23mv86n790g4vm2706c2m38v6n790',
      refreshTokenExpireIn: 60
    })) {
      // If Login Successfull, then Redirect the user to secure route
      history.push('/secure')
    } else {
      // Else, there must be some error. So, throw an error
      alert("Error Occoured. Try Again")
    }
  }
  console.log(isAuthenticated())
  if (isAuthenticated()) {
    // If authenticated user, then redirect to secure dashboard

    return (
      <Redirect to={'/secure'}/>
    )
  } else {
    // If not authenticated, use the login flow
    // For Demostration, I'm using just a button to login.
    // In reality, there should be a form, validation, nwetowrk request and other things
    return (
      <button onClick={loginHandler}>Log In!!</button>
    )
  }
}

export default Login
