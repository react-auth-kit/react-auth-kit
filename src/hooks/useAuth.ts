/*
 * Copyright 2020 Arkadip Bhattacharya
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

import * as React from 'react';
import {AuthContext} from '../AuthProvider';
import {signInFunctionParams} from '../types';

/**
 * Use Auth Hook.
 * Implement all features
 */
function useAuth():
  {
    authHeader: () => (string | null),
    signIn: (signInConfig: signInFunctionParams) => boolean,
    signOut: () => (boolean); isAuthenticated: () => (boolean),
    authUser: () => (object | null)
    } {
  const c = React.useContext(AuthContext);

  /**
     * Get Auth header
     *
     * @returns authheader AuthHeader
     */
  const authHeader = (): string => {
    if (c?.authState) {
      return `${c.authState.authTokenType} ${c.authState.authToken}`;
    } else {
      return `Bearer `;
    }
  };

  /**
     * Get Auth user State
     *
     * @returns authuser state
     */
  const authUser = (): (object | null) => {
    return c.authState.authState;
  };

  /**
     * Get If the user is Authenticated
     *
     * @returns true | false
     */
  const isAuthenticated = () => {
    if (c?.authState.authToken && c?.authState.expireAt) {
      if (new Date(c.authState.expireAt) > new Date()) {
        return true;
      } else {
        c.setAuthState({
          authToken: null,
          authTokenType: null,
          expireAt: null,
          authState: null,
        });
        return false;
      }
    } else {
      return false;
    }
  };

  /**
     * Sign In Function
     *
     * @param signInConfig
     *
     * @returns true if sign-in else false
     */
  const signIn = (signInConfig: signInFunctionParams): boolean => {
    const {token, tokenType, authState, expiresIn} = signInConfig;
    const expTime = new Date(new Date().getTime() + expiresIn * 60 * 1000);
    try {
      if (c) {
        c.setAuthState((prevState) => ({
          ...prevState,
          authToken: token,
          authTokenType: tokenType,
          expireAt: expTime,
          authState: authState,
        }));
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  /**
     * Sign Out Function
     *
     * @returns true | false
     */
  const signOut = () => {
    try {
      if (c?.authState.authToken) {
        c.setAuthState((prevState) => ({
          ...prevState,
          authToken: null,
          authTokenType: null,
          expireAt: null,
          authState: null,
        }));
        console.log('RAJ :: Signing Out');
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };

  return {authHeader, isAuthenticated, authUser, signOut, signIn};
}

export default useAuth;
