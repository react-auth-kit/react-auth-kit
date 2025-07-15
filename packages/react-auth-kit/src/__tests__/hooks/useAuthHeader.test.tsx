import React from 'react';
import Cookies from 'js-cookie';
import {renderHook} from '@testing-library/react';

import * as AC from '../../AuthContext';
import AuthContext from '../../AuthContext';
import useAuthHeader from '../../hooks/useAuthHeader';
import {createCookieTokenStore} from "../helpers/storeCreation";


describe('useAuthHeader', () => {
  it('should return an empty string if the user is not in the context', () => {
    const tokenObject= createCookieTokenStore("__", false);

    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider value={{store: tokenObject, config: {}}}>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useAuthHeader(), {wrapper});
    expect(result.current()).toBeNull();
  });

  it('should return an Auth if the user is not in the context', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
      '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
      '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
    Cookies.set('___auth', token);
    Cookies.set('___auth_type', 'Bearer');
    Cookies.set('___state', '{}');

    const tokenObject = createCookieTokenStore("__", false);

    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider value={{store: tokenObject, config: {}}}>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useAuthHeader(), {wrapper});
    expect(result.current()).toBe(`Bearer ${token}`);
  });

  it('the auth is there and expired', () => {
    const spy = jest.fn();
    const mockUseReactAuthKit = jest.spyOn(AC, 'useReactAuthKitStore');
    // @ts-expect-error response type is missing
    mockUseReactAuthKit.mockImplementation(()=>(
      {
        value: {
          auth: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY'+
            '3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxMDA4NjA1MTk1fQ.zII9AZg'+
            'jgXMlfuNmN7dx-v-ROl3vl4eJdFc_3XfLWbs',
            type: 'Bearer',
            expiresAt: new Date(1008605195),
          },
          userState: {'name': 'react'},
          isSignIn: true,
          isUsingRefreshToken: false,
        },
        set: spy,
      }
    ));

    const tokenObject = createCookieTokenStore("__", false);
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider value={{store: tokenObject, config: {}}}>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useAuthHeader(), {wrapper});
    expect(result.current()).toBeNull();
    expect(spy).toHaveBeenCalled();

    mockUseReactAuthKit.mockRestore();
  });
});

export {};
