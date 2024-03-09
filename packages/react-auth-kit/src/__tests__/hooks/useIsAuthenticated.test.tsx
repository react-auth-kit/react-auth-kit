import React from 'react';
import {renderHook} from '@testing-library/react';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import AuthContext from '../../AuthContext';
import Cookies from 'js-cookie';
import TokenObject from '../../RxTokenObject';

describe('useIsAuthenticated', () => {
  it('should return false if the auth data is not in the context', () => {
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

    const {result} = renderHook(() => useIsAuthenticated(), {wrapper});
    expect(result.current).toBe(false);
  });

  it('should return true if the auth is there and not expired', () => {
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
        true,
        window.location.hostname,
        window.location.protocol === 'https:',
    );
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider value={tokenObject}>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useIsAuthenticated(), {wrapper});
    expect(result.current).toBe(true);
  });
});

export {};
