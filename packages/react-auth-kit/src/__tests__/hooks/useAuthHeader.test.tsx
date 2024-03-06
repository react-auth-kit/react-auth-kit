import React from 'react';
import {renderHook} from '@testing-library/react';
import useAuthHeader from '../../hooks/useAuthHeader';
import AuthContext from '../../AuthContext';
import TokenObject from '../../RxTokenObject';
import Cookies from 'js-cookie';

describe('useAuthHeader', () => {

  it('should return an empty string if the user is not in the context', () => {
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

    const {result} = renderHook(() => useAuthHeader(), {wrapper});
    expect(result.current).toBeNull();
  });

  it('should return the auth header if it is available in the context', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
      '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
      '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
    Cookies.set('__', token);
    Cookies.set('___type', 'Bearer');
    Cookies.set('___state', '{}');
    
    const tokenObject = new TokenObject<unknown>(
      '__',
      'cookie',
      null,
      true,
      window.location.hostname,
      window.location.protocol === 'https:',
    );

    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider value={tokenObject}>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useAuthHeader(), {wrapper});
    expect(result.current).toBe(`Bearer ${token}`);
  });
});

export {};
