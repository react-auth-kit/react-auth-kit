import React from 'react';
import Cookies from 'js-cookie';
import {renderHook} from '@testing-library/react';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';

import AuthContext from '../../AuthContext';
import * as AC from '../../AuthContext';

import {IRouter} from "../../route";
import {createCookieTokenStore} from "../helpers/storeCreation";

describe('useIsAuthenticated', () => {
  it('the auth data is not in the context', () => {
    const tokenObject = createCookieTokenStore("__", false);

    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider value={{store: tokenObject, config: {}}}>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useIsAuthenticated(), {wrapper});
    expect(result.current()).toBe(false);
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

    const {result} = renderHook(() => useIsAuthenticated(), {wrapper});
    expect(result.current()).toBe(false);
    expect(spy).toHaveBeenCalled();

    mockUseReactAuthKit.mockRestore();
  });

  it('the auth is there and not expired', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
      '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
      '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
    Cookies.set('___auth', token);
    Cookies.set('___auth_type', 'Bearer');
    Cookies.set('___state', '{"name":"react"}');

    const tokenObject = createCookieTokenStore("__", false);
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider value={{store: tokenObject, config: {}}}>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useIsAuthenticated(), {wrapper});
    expect(result.current()).toBe(true);
  });
});

describe('Redirection', ()=>{
  const tokenObject = createCookieTokenStore("__", false);

  const navigateSpy = jest.fn();

  const ReactRouterPlugin: IRouter = {
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
      <AuthContext.Provider value={{store: tokenObject, config: {}}}>
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
        value={{store: tokenObject, router: ReactRouterPlugin, config: {}}}
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
        value={{store: tokenObject, config: {fallbackPath: '/b'}}}
      >
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useIsAuthenticated(), {wrapper});
    expect(result.current()).toBe(false);
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('Fallback Path is same as current path', ()=>{
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider
        value={
          {
            store: tokenObject,
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

  it('Fallback Path is different from current path', ()=>{
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider
        value={
          {
            store: tokenObject,
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
