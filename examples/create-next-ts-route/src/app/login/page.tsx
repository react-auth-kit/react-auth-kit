"use client"

import React from 'react'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import { useRouter } from 'next/navigation'
import { UserData } from '@/types'

const page = () => {
  const isAuthenticated = useIsAuthenticated()
  const signIn = useSignIn<UserData>()
  const { push } = useRouter()

  /**
   * Login Handle, the callback function onClick from the "Login" button
   *
   * This function demostrate a dummy authentication, using useSignIn function
   */
  const loginHandler = () => {
    // Assuming that, all network Request is successfull, and the user is authenticated

    if (signIn({
      auth: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw603AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8'
      },
      userState: { name: 'Manas Baroi', uid: '123456', email: 'manas@abc.com' }
    })) {
      // If Login Successfull, then Redirect the user to secure route
      push('/secure')
    } else {
      // Else, there must be some error. So, throw an error
      alert("Error Occoured. Try Again")
    }
  }
  console.log(isAuthenticated())
  if (isAuthenticated()) {
    // If authenticated user, then redirect to secure dashboard

    push('/secure')
    return <></>;
  } else {
    // If not authenticated, use the login flow
    // For Demostration, I'm using just a button to login.
    // In reality, there should be a form, validation, nwetowrk request and other things
    return (
      <div className='flex justify-center items-center h-screen bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-rose-500 to-indigo-700'>
        <button className='p-2 border rounded-md bg-cyan-500 hover:bg-cyan-700 text-white' onClick={loginHandler}>Log In!!</button>
      </div>

    )
  }
}

export default page