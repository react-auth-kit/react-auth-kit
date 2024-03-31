import React from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import useSignOut from 'react-auth-kit/hooks/useSignOut'


const SecureComponent = () => {
    const signOut = useSignOut()
    const authUser = useAuthUser()

    const signOutAction = () => {
        signOut('/login')
    }
    
    return (
        <div className='p-2'>
            <p className='p-6 font-bold text-4xl'>{`Hello ${authUser.name}, your U-ID is: ${authUser.uid}`}</p>
            <button className='p-2 border rounded-md bg-red-500 hover:bg-red-700 text-white' onClick={signOutAction}>Sign Out!</button>
        </div>
    )
}

export default SecureComponent