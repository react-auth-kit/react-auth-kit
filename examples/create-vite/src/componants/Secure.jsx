import React from 'react'
import axios from 'axios';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'


const SecureComponent = () => {
    const signOut = useSignOut()
    const authUser = useAuthUser()
    const authHeader = useAuthHeader();

    const signOutAction = () => {
        signOut('/login')
    }

    const getData = async () => {
        const header = authHeader();
        console.log(header);
        const res = await axios.get(
            'https://demo4875674.mockable.io/hello',
            {
                headers: {'Authorization': header}
            }
        )
        console.log(res.data);
    }
    
    return (
        <div className='p-2'>
            <p className='p-6 font-bold text-4xl'>{`Hello ${authUser().name}, your U-ID is: ${authUser().uid}`}</p>
            <button className='p-2 border rounded-md bg-red-500 hover:bg-red-700 text-white' onClick={signOutAction}>Sign Out!</button>

            <button className='p-2 border rounded-md bg-green-500 hover:bg-green-700 text-white' onClick={getData}>Get Data</button>

        </div>
    )
}

export default SecureComponent