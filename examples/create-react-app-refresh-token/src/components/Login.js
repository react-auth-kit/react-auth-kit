import React from 'react'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import {Navigate} from 'react-router-dom'

const Login = () => {
  const isAuthenticated = useIsAuthenticated()
  const signIn = useSignIn()

  /**
   * Login Handle, the callback function onClick from the "Login" button
   *
   * This function demostrates a fake authentication, using useSignIn function
   */
  const loginHandler = () => {
    // Assuming that, all network Request is successfully, and the user is authenticated

    signIn({
      auth: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxNzE0NDU5MzczfQ.EZyy_F_9izv2xLm1nDMuOoS4zXb_bw5Aaqp_TEd-uzk'
      },
      userState: {name: 'React User', uid: 123456},
      navigateTo: '/secure',
      refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw603AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8'
    })
  }
  console.log(isAuthenticated())
  if (isAuthenticated()) {
    // If authenticated user, then redirect to secure dashboard

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
