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
import useAuthUser from '../../hooks/useAuthUser';
import AuthContext from '../../AuthContext';

describe('useAuthUser', () => {
  it('should thrown an error if the AuthContext is not available', () => {
    expect(useAuthUser).toThrow(Error);
  });

  it('should return null if the user is not in authenticated', () => {
    const fakeAuthState = {
      authState: {
        auth: null,
        refresh: null,
        userState: {
          id: 'user-id',
        },
        isSignIn: false,
        isUsingRefreshToken: false,
      },
      dispatch: () => null,
    };
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider value={fakeAuthState}>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useAuthUser(), {wrapper});
    expect(result.current()).toBe(null);
  });

  it('should return the user state if the user is authenticated', () => {
    const fakeAuthState = {
      authState: {
        auth: {
          type: 'Bearer',
          token: 'xxxxxxxxx',
          expiresAt: new Date(),
        },
        refresh: null,
        userState: {
          id: 'user-id',
        },
        isSignIn: false,
        isUsingRefreshToken: false,
      },
      dispatch: () => null,
    };
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider value={fakeAuthState}>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useAuthUser(), {wrapper});
    expect(result.current()).toStrictEqual({id: 'user-id'});
  });
});

export {};
