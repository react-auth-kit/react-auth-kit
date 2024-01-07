import React from 'react'
import {useNavigate} from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import useSignOut from 'react-auth-kit/hooks/useSignOut'


const SecureComponent = () => {
    const navigate = useNavigate()
    const signOut = useSignOut()
    const authUser = useAuthUser()

    const signOutAction = () => {
        signOut()
        navigate('/login')
    }

    return (
        <div>
            <p>{`Hello ${authUser()!.name}, your U-ID is: ${authUser()!.uid}`}</p>
            <button onClick={signOutAction}>Sign Out!</button>
        </div>
    )
}

export default SecureComponent