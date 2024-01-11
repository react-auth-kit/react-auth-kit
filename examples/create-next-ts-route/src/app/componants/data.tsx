"use client"

import { UserData } from '@/types';
import { useAuth } from '@auth-kit/next/useAuth';
import { useRouter } from 'next/navigation';
import React from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useSignOut from 'react-auth-kit/hooks/useSignOut';

export const SecureData = () => {

    // for login route redirection
    useAuth({ fallbackPath: '/login', });
  
    // for logout
    const data = useAuthUser<UserData>()
    const signOut = useSignOut();
    const { push } = useRouter();
  
    const logOutHandler = () => {
      signOut()
      push('/')
    }
  
    return (
      <div className='flex h-screen justify-center items-center flex-col'>
       
        <h1 className='font-bold p-2'>{`The User name is  : ${data?.name}`}</h1>
        <button onClick={logOutHandler} className="inline-flex items-center px-4 py-2 font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600  ms-3">Log Out</button>
     

      </div>
    )
  }