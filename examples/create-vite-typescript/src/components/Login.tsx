/*
 * Copyright 2025 Arkadip Bhattacharya
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


import {Navigate, useLocation} from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import {jwt_encode} from "../util.ts";
import type {UserState} from "../types.ts";

const Login = () => {
  const location = useLocation();
  const isAuthenticated = useIsAuthenticated()
  const signIn = useSignIn<UserState>()
  console.log(location.pathname)
  /**
   * Login Handle, the callback function onClick from the "Login" button
   *
   * This function demonstrates a fake authentication, using useSignIn function
   */
  const loginHandler = () => {
    // Assuming that, all network Request is successful, and the user is authenticated
    signIn({
      auth: {
        token: jwt_encode({
          "sub": "1234567890",
          "name": "John Doe",
          "exp": Math.floor(new Date().valueOf() / 1000) + 120
        }, "12334")
      },
      userState: {name: 'React Auth Kit', uid: 123456},
      refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw603AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8',
      navigateTo: '/secure'
    })
  }
  // console.log(isAuthenticated())
  if (isAuthenticated) {
    // If an authenticated user, then redirect to a secure dashboard

    return (
      <Navigate to={'/secure'} replace/>
    )
  } else {
    // If not authenticated, use the login flow
    // For Demonstration; I'm using just a button to log in.
    // In reality, there should be a form, validation, network request and other things
    return (
      <button onClick={loginHandler}>Log In!!</button>
    )

  }
}
export default Login;
