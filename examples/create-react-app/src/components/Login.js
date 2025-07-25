import React from 'react'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useSignIn from 'react-auth-kit/hooks/useSignIn'

import {useNavigate, Navigate} from 'react-router-dom'


const Login = () => {

  const isAuthenticated = useIsAuthenticated()
  const signIn = useSignIn()
  const navigate = useNavigate()

  /**
   * Login Handle, the callback function onClick from the "Login" button
   *
   * This function demonstrates a fake authentication, using useSignIn function
   */
  const loginHandler = () => {
    // Assuming that, all network Request is successfully, and the user is authenticated

    if (signIn({
      auth: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw603AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8'
      },
      userState: {name: 'React User', uid: 123456}
    })) {
      // If Login Successfully, then Redirect the user to a secure route
      navigate('/secure')
    } else {
      // Else, there must be some error. So, throw an error
      alert("Error Occurred. Try Again")
    }
  }
  console.log(isAuthenticated())
  if (isAuthenticated()) {
    // If an authenticated user, then redirect to secure dashboard

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

export default Login
