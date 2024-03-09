import React from 'react';
import {renderHook} from '@testing-library/react';

import useAuthUser from '../../hooks/useAuthUser';
import AuthContext from '../../AuthContext';
import TokenObject from '../../RxTokenObject';
import Cookies from 'js-cookie';

describe('useAuthUser', () => {
  it('should return null if the user is not in authenticated', () => {
    const tokenObject = new TokenObject<unknown>(
        '__',
        'cookie',
        null,
        false,
        window.location.hostname,
        window.location.protocol === 'https:',
    );

    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider value={tokenObject}>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useAuthUser(), {wrapper});
    expect(result.current).toBeNull();
  });

  it('should return the user state if the user is authenticated', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
      '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
      '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
    Cookies.set('__', token);
    Cookies.set('___type', 'Bearer');
    Cookies.set('___state', '{"name":"react"}');

    const tokenObject = new TokenObject<unknown>(
        '__',
        'cookie',
        null,
        false,
        window.location.hostname,
        window.location.protocol === 'https:',
    );
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider value={tokenObject}>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useAuthUser(), {wrapper});
    expect(result.current).toStrictEqual({name: 'react'});
  });
});

export {};
