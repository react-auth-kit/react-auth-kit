import React from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import useSignOut from 'react-auth-kit/hooks/useSignOut'


const SecureComponent = () => {
    const signOut = useSignOut()
    const authUser = useAuthUser()
    
    return (
        <div>
            <p>{`Hello ${authUser().name}, your U-ID is: ${authUser().uid}`}</p>
            <button onClick={() => signOut()}>Sign Out!</button>
        </div>
    )
}

export default SecureComponent