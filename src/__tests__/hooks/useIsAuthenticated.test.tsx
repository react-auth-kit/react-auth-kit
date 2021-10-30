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
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import AuthContext from '../../AuthContext';
import {ActionType} from '../../utils/actions';

describe('useIsAuthenticated', () => {
  it('should thrown an error if the AuthContext is not available', () => {
    expect(useIsAuthenticated).toThrow(Error);
  });

  it('should return false if the auth data is not in the context', () => {
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

    const {result} = renderHook(() => useIsAuthenticated(), {wrapper});
    expect(result.current()).toBe(false);
    expect(fakeAuthState.dispatch).not.toBeCalled();
  });

  it('should return false and signout if the auth is expired', () => {
    const fakeAuthState = {
      authState: {
        auth: {
          type: 'Bearer',
          token: 'xxxxxxxxx',
          expiresAt: new Date((new Date()).getTime() - 10000),
        },
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

    const {result} = renderHook(() => useIsAuthenticated(), {wrapper});
    expect(result.current()).toBe(false);
    expect(fakeAuthState.dispatch).toBeCalledWith({type: ActionType.SignOut});
  });

  it('should return true if the auth is there and not expired', () => {
    const fakeAuthState = {
      authState: {
        auth: {
          type: 'Bearer',
          token: 'xxxxxxxxx',
          expiresAt: new Date((new Date()).getTime() + 10000),
        },
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

    const {result} = renderHook(() => useIsAuthenticated(), {wrapper});
    expect(result.current()).toBe(true);
    expect(fakeAuthState.dispatch).not.toBeCalled();
  });
});

export {};
