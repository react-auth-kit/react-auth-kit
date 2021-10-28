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
import useAuthHeader from '../../hooks/useAuthHeader';
import AuthContext from '../../AuthContext';

describe('useAuthHeader', () => {
  it('should thrown an error if the AuthContext is not available', () => {
    expect(useAuthHeader).toThrow(Error);
  });

  it('should return an empty string if the user is not in the context', () => {
    const fakeAuthState = {
      authState: {
        auth: null,
        refresh: null,
        userState: null,
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

    const {result} = renderHook(() => useAuthHeader(), {wrapper});
    expect(result.current()).toBe('');
  });

  it('should return the auth header if it is available in the context', () => {
    const fakeAuthState = {
      authState: {
        auth: {
          type: 'Bearer',
          token: 'xxxxxxxxx',
          expiresAt: new Date(),
        },
        refresh: null,
        userState: null,
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

    const {result} = renderHook(() => useAuthHeader(), {wrapper});
    expect(result.current()).toBe('Bearer xxxxxxxxx');
  });
});

export {};
