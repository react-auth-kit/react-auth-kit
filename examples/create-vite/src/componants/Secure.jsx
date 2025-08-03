import React from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'


const SecureComponent = () => {
  const signOut = useSignOut('/login')
  const authUser = useAuthUser()
  const authHeader = useAuthHeader();

  const signOutAction = () => {
    signOut()
  }


  return (
    <div>
      <p>{`Hello ${authUser().name}, your U-ID is: ${authUser().uid} Auth Header: ${authHeader()} `}</p>
      <button onClick={signOutAction}>Sign Out!</button>
    </div>
  )
}

export default SecureComponent
