"use client";

import React from 'react'
import createStore from 'react-auth-kit/createStore'
import AuthProvider from 'react-auth-kit/AuthProvider'
import { UserData } from '@/types';


const store = createStore<UserData>({
    authName:"__auth",
    authType:"cookie",
    cookieDomain:'localhost',
    cookieSecure:false,
})

const Providers = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
    
  return (
    <AuthProvider store={store}>
        {children}
    </AuthProvider>
  )
}

export default Providers