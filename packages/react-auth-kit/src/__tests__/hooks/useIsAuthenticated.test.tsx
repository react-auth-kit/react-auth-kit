import React from 'react';
import Cookies from 'js-cookie';
import {renderHook} from '@testing-library/react';
import TokenObject from '../../RxTokenObject';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';

import AuthContext from '../../AuthContext';
import * as AC from '../../AuthContext';
import type Router from '../../route';

describe('useIsAuthenticated', () => {
  it('the auth data is not in the context', () => {
    const tokenObject = new TokenObject<unknown>(
        '__',
        'cookie',
        null,
        false,
        window.location.hostname,
        window.location.protocol === 'https:',
    );
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider value={{token: tokenObject, config: {}}}>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useIsAuthenticated(), {wrapper});
    expect(result.current()).toBe(false);
  });

  it('the auth is there and expired', () => {
    const spy = jest.fn();
    const mockUseReactAuthKit = jest.spyOn(AC, 'useReactAuthKit');
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

    const tokenObject = new TokenObject<unknown>(
        '__',
        'cookie',
        null,
        false,
        window.location.hostname,
        window.location.protocol === 'https:',
    );
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider value={{token: tokenObject, config: {}}}>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useIsAuthenticated(), {wrapper});
    expect(result.current()).toBe(false);
    expect(spy).toHaveBeenCalled();

    mockUseReactAuthKit.mockRestore();
  });

  it('the auth is there and not expired', () => {
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
      <AuthContext.Provider value={{token: tokenObject, config: {}}}>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useIsAuthenticated(), {wrapper});
    expect(result.current()).toBe(true);
  });
});

describe('Redirection', ()=>{
  const tokenObject = new TokenObject<unknown>(
      '__',
      'cookie',
      null,
      false,
      window.location.hostname,
      window.location.protocol === 'https:',
  );

  const navigateSpy = jest.fn();

  const ReactRouterPlugin: Router = {
    navigate: jest.fn(),
    useNavigate: function(): ({to}: { to: string; }) => void {
      return navigateSpy;
    },
    usePath: function(): () => string {
      return jest.fn(()=> '/a');
    },
  };

  beforeEach(()=>{
    navigateSpy.mockClear();
  });


  it('No Implementation is there', () => {
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider value={{token: tokenObject, config: {}}}>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useIsAuthenticated(), {wrapper});
    expect(result.current()).toBe(false);
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('Only Router Plugin is there', ()=>{
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider
        value={{token: tokenObject, router: ReactRouterPlugin, config: {}}}
      >
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useIsAuthenticated(), {wrapper});
    expect(result.current()).toBe(false);
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('Only Fallback Path is there', ()=>{
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider
        value={{token: tokenObject, config: {fallbackPath: '/b'}}}
      >
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useIsAuthenticated(), {wrapper});
    expect(result.current()).toBe(false);
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('Fallbackpath is same as current path', ()=>{
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider
        value={
          {
            token: tokenObject,
            router: ReactRouterPlugin,
            config: {fallbackPath: '/a'},
          }
        }
      >
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useIsAuthenticated(), {wrapper});
    expect(result.current()).toBe(false);
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('Fallbackpath is different from current path', ()=>{
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider
        value={
          {
            token: tokenObject,
            router: ReactRouterPlugin,
            config: {fallbackPath: '/b'},
          }
        }
      >
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useIsAuthenticated(), {wrapper});
    expect(result.current()).toBe(false);
    expect(navigateSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith({'to': '/b'});
  });
});
