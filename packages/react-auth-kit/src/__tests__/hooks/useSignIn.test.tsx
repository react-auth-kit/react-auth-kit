import React from 'react';
import {renderHook} from '@testing-library/react';
import useSignIn from '../../hooks/useSignIn';
import AuthContext from '../../AuthContext';
import TokenObject from '../../RxTokenObject';
import * as reducers from '../../utils/reducers';
import { AuthError } from '../../errors';

const spy = jest.spyOn(reducers,  'doSignIn');

describe('useSignIn', () => {
  describe('Check error conditions', ()=>{
    it('Is refresh is on, but no refresh is specified', ()=>{
      const tokenObject = new TokenObject<unknown>(
        '__',
        'cookie',
        '___refresh',
        true,
        window.location.hostname,
        window.location.protocol === 'https:',
      );
      const wrapper = ({children}: {children: React.ReactNode}) => (
        <AuthContext.Provider value={tokenObject}>
          {children}
        </AuthContext.Provider>
      );

      const {result} = renderHook(() => useSignIn(), {wrapper});
      
      expect(() => result.current({
        auth: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
          '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
          '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8'
        }
      })).toThrow(AuthError);
      expect(spy).not.toHaveBeenCalled();
    });

    it('Is refresh is off, but refresh is specified', ()=>{
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

      const {result} = renderHook(() => useSignIn(), {wrapper});
      
      expect(() => result.current({
        auth: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
          '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
          '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8'
        },
        refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
        '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
        '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8'
      })).toThrow(AuthError);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('Proper Sign In condition', ()=>{
    it('Without refresh token', ()=> {
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

      const {result} = renderHook(() => useSignIn(), {wrapper});
      
      expect(() => result.current({
        auth: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
          '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
          '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8'
        }
      })).not.toThrow(AuthError);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(
        {
          auth: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMj"+
            "M0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ"+
            ".ijw603AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8"
          }
        }
      )
    });

    it('With refresh token', ()=> {
      const tokenObject = new TokenObject<unknown>(
        '__',
        'cookie',
        '___refresh',
        true,
        window.location.hostname,
        window.location.protocol === 'https:',
      );
      const wrapper = ({children}: {children: React.ReactNode}) => (
        <AuthContext.Provider value={tokenObject}>
          {children}
        </AuthContext.Provider>
      );

      const {result} = renderHook(() => useSignIn(), {wrapper});
      
      expect(() => result.current({
        auth: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
          '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
          '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8'
        },
        refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
        '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
        '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8'
      })).not.toThrow(AuthError);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(
        {
          auth: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMj"+
            "M0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ"+
            ".ijw603AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8"
          },
          refresh: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMj"+
          "M0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ"+
          ".ijw603AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8"
        }
      )
    });
  });
});
