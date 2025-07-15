import React from 'react';
import {renderHook} from '@testing-library/react';

import AuthContext from '../../AuthContext';
import useSignIn from '../../hooks/useSignIn';
import Action from '../../utils/action';
import {AuthKitError} from "../../error";
import {IRouter} from "../../route";
import {createCookieTokenStore} from "../helpers/storeCreation";

const signInActionSpy = jest.spyOn(Action, "doSignIn");

describe('useSignIn', () => {
  describe('Check error conditions', ()=>{
    it('Is refresh is on, but no refresh is specified', ()=>{
      const tokenObject = createCookieTokenStore("__", true);

      const wrapper = ({children}: {children: React.ReactNode}) => (
        <AuthContext.Provider value={{store: tokenObject, config: {}}}>
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
      })).toThrow(AuthKitError);
      expect(signInActionSpy).not.toHaveBeenCalled();
    });

    it('Is refresh is off, but refresh is specified', ()=>{
      const tokenObject = createCookieTokenStore("__", false);
      const wrapper = ({children}: {children: React.ReactNode}) => (
        <AuthContext.Provider value={{store: tokenObject, config: {}}}>
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
      })).toThrow(AuthKitError);
      expect(signInActionSpy).not.toHaveBeenCalled();
    });

    it('navigateTo is specified, but Plugin is not integrated', ()=>{
      const tokenObject = createCookieTokenStore("__", false);
      const wrapper = ({children}: {children: React.ReactNode}) => (
        <AuthContext.Provider value={{store: tokenObject, config: {}}}>
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
      })).toThrow(AuthKitError);
    });
  });

  describe('Proper Sign In condition', ()=>{
    it('Without refresh token', ()=> {
      const tokenObject = createCookieTokenStore("__", false);
      const wrapper = ({children}: {children: React.ReactNode}) => (
        <AuthContext.Provider value={{store: tokenObject, config: {}}}>
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
      })).not.toThrow(AuthKitError);
      expect(signInActionSpy).toHaveBeenCalled();
      expect(signInActionSpy).toHaveBeenCalledWith(
        {
          auth: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMj'+
          'M0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ'+
          '.ijw603AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8',
          },
        },
        tokenObject,
      );
    });

    it('With refresh token', ()=> {
      const tokenObject = createCookieTokenStore("__", true);
      const wrapper = ({children}: {children: React.ReactNode}) => (
        <AuthContext.Provider value={{store: tokenObject, config: {}}}>
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
      })).not.toThrow(AuthKitError);
      expect(signInActionSpy).toHaveBeenCalled();
      expect(signInActionSpy).toHaveBeenCalledWith(
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
        tokenObject
      );
    });
  });

  describe('Proper Redirection is working without Refresh token', ()=>{
    let navigateFn: jest.Mock<any, any, any>;
    const ReactRouterPlugin: IRouter = {
      navigate: jest.fn(),
      useNavigate: function(): ({to}: { to: string; }) => void {
        return navigateFn;
      },
      usePath: function(): () => string {
        return jest.fn();
      },
    };

    const tokenObject = createCookieTokenStore("__", false);

    const AuthProvider = ({children} : {children: React.ReactNode}) => (
      <AuthContext.Provider value={
        {
          store: tokenObject,
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
      })).not.toThrow(AuthKitError);
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
      })).not.toThrow(AuthKitError);
      expect(navigateFn).not.toHaveBeenCalled();
    });
  });

  describe('Proper Redirection is working With Refresh Token', ()=>{
    let navigateFn: jest.Mock<any, any, any>;
    const ReactRouterPlugin: IRouter = {
      navigate: jest.fn(),
      useNavigate: function(): ({to}: { to: string; }) => void {
        return navigateFn;
      },
      usePath: function(): () => string {
        return jest.fn();
      },
    };

    const tokenObject = createCookieTokenStore("__", true);

    const AuthProvider = ({children} : {children: React.ReactNode}) => (
      <AuthContext.Provider value={
        {
          store: tokenObject,
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
      })).not.toThrow(AuthKitError);
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
      })).not.toThrow(AuthKitError);
      expect(navigateFn).not.toHaveBeenCalled();
    });
  });
});
