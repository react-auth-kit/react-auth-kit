import React from 'react'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useSignIn from 'react-auth-kit/hooks/useSignIn'

import {Navigate, useLocation} from 'react-router-dom'



const Login = () => {
  const location = useLocation()
  const isAuthenticated = useIsAuthenticated()
  const signIn = useSignIn()
  console.log(location.pathname)
  /**
   * Login Handle, the callback function onClick from the "Login" button
   *
   * This function demostrate a dummy authentication, using useSignIn function
   */
  const loginHandler = () => {
    // Assuming that, all network Request is successfull, and the user is authenticated

    signIn({
      auth: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxNzE0NDYyMTczfQ.J8A_jlXgeZQWm_kMP5sqq6tK0nLLWJGpGXVRtm2DNc8'
      },
      userState: {name: 'Manas Baroi', uid: 123456},
      refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw603AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8',
      navigateTo: '/secure'
    })
  }
  // console.log(isAuthenticated())
  if (isAuthenticated()) {
    // If authenticated user, then redirect to secure dashboard

    return (
      <Navigate to={'/secure'} replace/>
    )
  } else {
    // If not authenticated, use the login flow
    // For Demostration, I'm using just a button to login.
    // In reality, there should be a form, validation, nwetowrk request and other things
    return (
      <button className='p-2 border rounded-md bg-cyan-500 hover:bg-cyan-700 text-white' onClick={loginHandler}>Log In!!</button>
    )
  }
}

export default Login
