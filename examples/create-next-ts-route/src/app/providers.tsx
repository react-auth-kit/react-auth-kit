'use client';

import React from 'react';
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit/AuthProvider';
import ReactRouterPlugin from '@auth-kit/next/route';
import {UserData} from '@/types';


const store = createStore<UserData>({
  authName: '__auth',
  authType: 'cookie',
  cookieDomain: '127.0.0.1',
  cookieSecure: false,
  debug: true,
});

const Providers = ({
  children,
}: {
    children: React.ReactNode
  }) => {
  return (
    <AuthProvider
      store={store}
      router={ReactRouterPlugin}
      fallbackPath='/login'
    >
      {children}
    </AuthProvider>
  );
};

export default Providers;
