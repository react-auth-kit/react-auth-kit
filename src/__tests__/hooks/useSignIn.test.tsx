/*
 * Copyright 2021 Arkadip Bhattacharya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import {renderHook} from '@testing-library/react-hooks';
import useSignIn from '../../hooks/useSignIn';
import AuthContext from '../../AuthContext';
import {ActionType} from '../../utils/actions';

Date.now = jest.fn(() => 1487076708000);

const fakeTime = new Date('2020-01-01').getTime();
jest.useFakeTimers().setSystemTime(fakeTime);

describe('useSignIn', () => {
  it('should thrown an error if the AuthContext is not available', () => {
    expect(useSignIn).toThrow(Error);
  });

  it('should fail when receive refresh tokens if they are disabled', () => {
    const fakeAuthState = {
      authState: {
        auth: null,
        refresh: null,
        userState: null,
        isSignIn: false,
        isUsingRefreshToken: false,
      },
      dispatch: jest.fn(),
    };
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider value={fakeAuthState}>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useSignIn(), {wrapper});
    expect(() => result.current({
      token: 'token',
      tokenType: 'Bearer',
      authState: {data: 'data'},
      expiresIn: 10,
      refreshToken: 'xxxx',
      refreshTokenExpireIn: 20,
    })).toThrow(Error);
    expect(fakeAuthState.dispatch).not.toBeCalled();
  });

  it('should fail when not receive refresh tokens if they are enabled', () => {
    const fakeAuthState = {
      authState: {
        auth: null,
        refresh: null,
        userState: null,
        isSignIn: false,
        isUsingRefreshToken: true,
      },
      dispatch: jest.fn(),
    };
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider value={fakeAuthState}>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useSignIn(), {wrapper});
    expect(() => result.current({
      token: 'token',
      tokenType: 'Bearer',
      authState: {data: 'data'},
      expiresIn: 10,
      refreshToken: '',
      refreshTokenExpireIn: 0,
    })).toThrow(Error);
    expect(fakeAuthState.dispatch).not.toBeCalled();
  });

  it('should dispatch a signIn action with refresh disabled', () => {
    const fakeAuthState = {
      authState: {
        auth: null,
        refresh: null,
        userState: null,
        isSignIn: false,
        isUsingRefreshToken: false,
      },
      dispatch: jest.fn(),
    };
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider value={fakeAuthState}>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useSignIn(), {wrapper});
    expect(() => result.current({
      token: 'token',
      tokenType: 'Bearer',
      authState: {data: 'data'},
      expiresIn: 10,
      refreshToken: '',
      refreshTokenExpireIn: 0,
    })).not.toThrow(Error);
    expect(fakeAuthState.dispatch).toBeCalledWith({
      type: ActionType.SignIn,
      payload: {
        auth: {
          token: 'token',
          type: 'Bearer',
          expiresAt: new Date(fakeTime + 10 * 1000 * 60),
        },
        refresh: null,
        userState: {data: 'data'},
      },
    });
  });

  it('should dispatch a signIn action with refresh enabled', () => {
    const fakeAuthState = {
      authState: {
        auth: null,
        refresh: null,
        userState: null,
        isSignIn: false,
        isUsingRefreshToken: true,
      },
      dispatch: jest.fn(),
    };
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider value={fakeAuthState}>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useSignIn(), {wrapper});
    expect(() => result.current({
      token: 'token',
      tokenType: 'Bearer',
      authState: {data: 'data'},
      expiresIn: 10,
      refreshToken: 'xxxx',
      refreshTokenExpireIn: 20,
    })).not.toThrow(Error);
    expect(fakeAuthState.dispatch).toBeCalledWith({
      type: ActionType.SignIn,
      payload: {
        auth: {
          token: 'token',
          type: 'Bearer',
          expiresAt: new Date(fakeTime + 10 * 1000 * 60),
        },
        refresh: {
          expiresAt: new Date(fakeTime + 20 * 1000 * 60),
          token: 'xxxx',
        },
        userState: {data: 'data'},
      },
    });
  });
});
