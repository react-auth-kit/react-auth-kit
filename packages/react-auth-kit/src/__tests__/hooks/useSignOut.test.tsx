import React from 'react';
import {renderHook} from '@testing-library/react';
import useSignOut from '../../hooks/useSignOut';
import AuthContext from '../../AuthContext';
import TokenObject from '../../RxTokenObject';
import * as reducers from '../../utils/reducers';
import type Router from '../../route';

import {BaseAuthKitError} from "../../error/BaseAuthKitError";

const spy = jest.spyOn(reducers, 'doSignOut');

describe('useSignOut', () => {
  it('Without refresh token', ()=> {
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

    const {result} = renderHook(() => useSignOut(), {wrapper});

    result.current();
    expect(spy).toHaveBeenCalled();
  });
});

describe('Redirection after signOut', ()=>{
  const tokenObject = new TokenObject<unknown>(
      '__',
      'cookie',
      null,
      false,
      window.location.hostname,
      window.location.protocol === 'https:',
  );
  it('Plugin is there, and navigateTo is specified', ()=>{
    const navigateFn = jest.fn();
    const ReactRouterPlugin: Router = {
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
          token: tokenObject,
          router: ReactRouterPlugin,
          config: {fallbackPath: '/login'},
        }
      }>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useSignOut(), {wrapper: AuthProvider});
    result.current('/login');

    expect(navigateFn).toHaveBeenCalled();
    expect(navigateFn).toHaveBeenCalledWith({to: '/login'});
  });

  it('Plugin is not there, and navigateTo is specified', ()=>{
    const AuthProvider = ({children} : {children: React.ReactNode}) => (
      <AuthContext.Provider value={
        {token: tokenObject, config: {fallbackPath: '/login'}}
      }>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useSignOut(), {wrapper: AuthProvider});
    expect(() => result.current('/login')).toThrow(BaseAuthKitError);
  });
});
