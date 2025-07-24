import React from 'react'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useSignIn from 'react-auth-kit/hooks/useSignIn'

import {useNavigate, Navigate} from 'react-router-dom'

interface UserData {
  name: String
  uid: Number
}

const Login = () => {
  const isAuthenticated = useIsAuthenticated()
  const signIn = useSignIn<UserData>()
  const navigate = useNavigate()

  /**
   * Login Handle, the callback function onClick from the "Login" button
   *
   * This function demostrates a fake authentication, using useSignIn function
   */
  const loginHandler = () => {
    // Assuming that, all network Request is successfully, and the user is authenticated

    if (signIn({
      auth: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo4MDA4NjA1MTk1fQ.E0EVT_4KVJHPEnC8XmukxiRRcAIo31U9wWW99RVQumA'
      },
      userState: {name: 'React User', uid: 123456}
    })) {
      // If Login Successfully, then Redirect the user to secure route
      navigate('/secure')
    } else {
      // Else, there must be some error. So, throw an error
      alert("Error Occurred. Try Again")
    }
  }
  console.log(isAuthenticated())
  if (isAuthenticated()) {
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

export default Login
