import React from 'react';
import {renderHook} from '@testing-library/react';

import type Router from '../../route';

import AuthContext from '../../AuthContext';
import TokenObject from '../../RxTokenObject';
import useSignIn from '../../hooks/useSignIn';
import * as reducers from '../../utils/reducers';
import {BaseAuthKitError} from "../../error/BaseAuthKitError";

const spy = jest.spyOn(reducers, 'doSignIn');

describe('useSignIn', () => {
  describe('Check error conditions', ()=>{
    it('Is refresh is on, but no refresh is specified', ()=>{
      const tokenObject = new TokenObject<unknown>(
          '__',
          'cookie',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );
      const wrapper = ({children}: {children: React.ReactNode}) => (
        <AuthContext.Provider value={{token: tokenObject, config: {}}}>
          {children}
        </AuthContext.Provider>
      );

      const {result} = renderHook(() => useSignIn(), {wrapper});

      expect(() => result.current({
        auth: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
          '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
          '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8',
        },
      })).toThrow(BaseAuthKitError);
      expect(spy).not.toHaveBeenCalled();
    });

    it('Is refresh is off, but refresh is specified', ()=>{
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

      const {result} = renderHook(() => useSignIn(), {wrapper});

      expect(() => result.current({
        auth: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
          '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
          '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8',
        },
        refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
        '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
        '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8',
      })).toThrow(BaseAuthKitError);
      expect(spy).not.toHaveBeenCalled();
    });

    it('navigateTo is specified, but Plugin is not integrated', ()=>{
      const tokenObject = new TokenObject<unknown>(
          '__',
          'cookie',
          '__refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );
      const wrapper = ({children}: {children: React.ReactNode}) => (
        <AuthContext.Provider value={{token: tokenObject, config: {}}}>
          {children}
        </AuthContext.Provider>
      );

      const {result} = renderHook(() => useSignIn(), {wrapper});

      expect(() => result.current({
        auth: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
          '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
          '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8',
        },
        refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
        '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
        '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8',
        navigateTo: '/secure',
      })).toThrow(BaseAuthKitError);
    });
  });

  describe('Proper Sign In condition', ()=>{
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

      const {result} = renderHook(() => useSignIn(), {wrapper});

      expect(() => result.current({
        auth: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
          '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
          '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8',
        },
      })).not.toThrow(BaseAuthKitError);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(
          {
            auth: {
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMj'+
            'M0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ'+
            '.ijw603AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8',
            },
          },
      );
    });

    it('With refresh token', ()=> {
      const tokenObject = new TokenObject<unknown>(
          '__',
          'cookie',
          '___refresh',
          false,
          window.location.hostname,
          window.location.protocol === 'https:',
      );
      const wrapper = ({children}: {children: React.ReactNode}) => (
        <AuthContext.Provider value={{token: tokenObject, config: {}}}>
          {children}
        </AuthContext.Provider>
      );

      const {result} = renderHook(() => useSignIn(), {wrapper});

      expect(() => result.current({
        auth: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
          '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
          '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8',
        },
        refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
        '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
        '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8',
      })).not.toThrow(BaseAuthKitError);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(
          {
            auth: {
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMj'+
            'M0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ'+
            '.ijw603AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8',
            },
            refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMj'+
          'M0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ'+
          '.ijw603AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8',
          },
      );
    });
  });

  describe('Proper Redirection is working without Refresh token', ()=>{
    let navigateFn: jest.Mock<any, any, any>;
    const ReactRouterPlugin: Router = {
      navigate: jest.fn(),
      useNavigate: function(): ({to}: { to: string; }) => void {
        return navigateFn;
      },
      usePath: function(): () => string {
        return jest.fn();
      },
    };

    const tokenObject = new TokenObject<unknown>(
        '__',
        'cookie',
        null,
        false,
        window.location.hostname,
        window.location.protocol === 'https:',
    );

    const AuthProvider = ({children} : {children: React.ReactNode}) => (
      <AuthContext.Provider value={
        {
          token: tokenObject,
          router: ReactRouterPlugin,
          config: {fallbackPath: '/login'},
        }
      }>
        {children}
      </AuthContext.Provider>);

    beforeEach(()=>{
      navigateFn = jest.fn();
    });

    it('navigateTo param is specified', ()=>{
      const {result} = renderHook(() => useSignIn(), {wrapper: AuthProvider});
      expect(() => result.current({
        auth: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
          '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
          '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8',
        },
        navigateTo: '/secure',
      })).not.toThrow(BaseAuthKitError);
      expect(navigateFn).toHaveBeenCalled();
      expect(navigateFn).toHaveBeenCalledWith({to: '/secure'});
    });

    it('navigateTo param is not specified', ()=>{
      const {result} = renderHook(() => useSignIn(), {wrapper: AuthProvider});
      expect(() => result.current({
        auth: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
          '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
          '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8',
        },
      })).not.toThrow(BaseAuthKitError);
      expect(navigateFn).not.toHaveBeenCalled();
    });
  });

  describe('Proper Redirection is working With Refresh Token', ()=>{
    let navigateFn: jest.Mock<any, any, any>;
    const ReactRouterPlugin: Router = {
      navigate: jest.fn(),
      useNavigate: function(): ({to}: { to: string; }) => void {
        return navigateFn;
      },
      usePath: function(): () => string {
        return jest.fn();
      },
    };

    const tokenObject = new TokenObject<unknown>(
        '__',
        'cookie',
        '__refresh',
        false,
        window.location.hostname,
        window.location.protocol === 'https:',
    );

    const AuthProvider = ({children} : {children: React.ReactNode}) => (
      <AuthContext.Provider value={
        {
          token: tokenObject,
          router: ReactRouterPlugin,
          config: {fallbackPath: '/login'},
        }
      }>
        {children}
      </AuthContext.Provider>);

    beforeEach(()=>{
      navigateFn = jest.fn();
    });

    it('navigateTo param is specified', ()=>{
      const {result} = renderHook(() => useSignIn(), {wrapper: AuthProvider});
      expect(() => result.current({
        auth: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
          '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
          '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8',
        },
        refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
        '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
        '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8',
        navigateTo: '/secure',
      })).not.toThrow(BaseAuthKitError);
      expect(navigateFn).toHaveBeenCalled();
      expect(navigateFn).toHaveBeenCalledWith({to: '/secure'});
    });

    it('navigateTo param is not specified', ()=>{
      const {result} = renderHook(() => useSignIn(), {wrapper: AuthProvider});
      expect(() => result.current({
        auth: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
          '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
          '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8',
        },
        refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
        '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
        '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8',
      })).not.toThrow(BaseAuthKitError);
      expect(navigateFn).not.toHaveBeenCalled();
    });
  });
});
