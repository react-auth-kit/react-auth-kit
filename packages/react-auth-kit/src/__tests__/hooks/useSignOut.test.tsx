import React from 'react';
import {renderHook} from '@testing-library/react';
import useSignOut from '../../hooks/useSignOut';
import AuthContext from '../../AuthContext';
import Action from '../../utils/action';

import {AuthKitError} from "../../error";
import {IRouter} from "../../route";
import {createCookieTokenStore} from "../helpers/storeCreation";

const signOutSpy = jest.spyOn(Action, 'doSignOut');

describe('useSignOut', () => {
  it('Without refresh token', ()=> {
    const tokenObject = createCookieTokenStore("__", false);
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider value={{store: tokenObject, config: {}}}>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useSignOut(), {wrapper});

    result.current();
    expect(signOutSpy).toHaveBeenCalled();
  });
});

describe('Redirection after signOut', ()=>{
  const tokenObject = createCookieTokenStore("__", false);
  it('Plugin is there, and navigateTo is specified', ()=>{
    const navigateFn = jest.fn();
    const ReactRouterPlugin: IRouter = {
      navigate: jest.fn(),
      useNavigate: function(): ({to}: { to: string; }) => void {
        return navigateFn;
      },
      usePath: function(): () => string {
        return jest.fn();
      },
    };

    const AuthProvider = ({children} : {children: React.ReactNode}) => (
      <AuthContext.Provider value={
        {
          store: tokenObject,
          router: ReactRouterPlugin,
          config: {fallbackPath: '/login'},
        }
      }>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useSignOut("/login"), {wrapper: AuthProvider});
    result.current('/login');

    expect(navigateFn).toHaveBeenCalled();
    expect(navigateFn).toHaveBeenCalledWith({to: '/login'});
  });

  it('Plugin is not there, and navigateTo is specified', ()=>{
    const AuthProvider = ({children} : {children: React.ReactNode}) => (
      <AuthContext.Provider value={
        {store: tokenObject, config: {fallbackPath: '/login'}}
      }>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useSignOut('/login'), {wrapper: AuthProvider});
    expect(() => result.current()).toThrow(AuthKitError);
  });
});
