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
import useSignOut from '../../hooks/useSignOut';
import AuthContext from '../../AuthContext';
import {ActionType} from '../../utils/actions';

describe('useSignOut', () => {
  it('should thrown an error if the AuthContext is not available', () => {
    expect(useSignOut).toThrow(Error);
  });

  it('should signOut and return true on success', () => {
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

    const {result} = renderHook(() => useSignOut(), {wrapper});
    expect(result.current()).toBe(true);
    expect(fakeAuthState.dispatch).toBeCalledWith({type: ActionType.SignOut});
  });

  it('should signOut and return false on failure', () => {
    const fakeAuthState = {
      authState: {
        auth: null,
        refresh: null,
        userState: null,
        isSignIn: false,
        isUsingRefreshToken: false,
      },
      dispatch: jest.fn(() => {
        throw new Error('test');
      }),
    };
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <AuthContext.Provider value={fakeAuthState}>
        {children}
      </AuthContext.Provider>
    );

    const {result} = renderHook(() => useSignOut(), {wrapper});
    expect(result.current()).toBe(false);
    expect(fakeAuthState.dispatch).toBeCalledWith({type: ActionType.SignOut});
  });
});

export {};
