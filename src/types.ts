/**
 * @author Arkadip Bhattacharya <in2arkadipb13@gmail.com>
 * @fileoverview General types used in the library
 * @copyright Arkadip Bhattacharya 2020
 *
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
import {AuthActions} from './utils/actions';

/**
 * Universal types
 */
export type AuthStateUserObject = {
  [x: string]: any;
}

export interface AuthKitStateInterface {
  auth: {
    token: string,
    type: string,
    expiresAt: Date
  } | null,
  refresh: {
    token: string,
    expiresAt: Date
  } | null,
  userState: AuthStateUserObject | null,
  isSignIn: boolean
  isUsingRefreshToken: boolean,
  // typeOfStorage: "cookie" | "localstorage"
}

/**
 * SignIn function param
 * Used by: useSignIn and withSignIn
 */
export interface signInFunctionParams {
  token: string
  tokenType: string | 'Bearer'
  expiresIn: number
  authState: AuthStateUserObject
  refreshToken?: string
  refreshTokenExpireIn?: number
}

/**
 * Context values type
 */
export interface AuthContextInterface {
  authState: AuthKitStateInterface
  dispatch: React.Dispatch<AuthActions>
}

/**
 * Auth Provider Props
 */
export interface AuthProviderProps {
  authType: 'cookie' | 'localstorage'
  authName: string,
  refresh?: createRefreshParamInterface
  cookieDomain?: string
  cookieSecure?: boolean
  children: React.ReactNode
}

/**
 * Refresh Token Callback Response
 */
 export type RefreshTokenCallbackResponse = {
  isSuccess: boolean,
  newAuthToken: string,
  newAuthTokenExpireIn?: number | null,
  newRefreshToken?: string | null,
  newRefreshTokenExpiresIn?: number | null,
  newAuthUserState?: AuthStateUserObject | null,
};

/**
 * Refresh Token types
 */
// Callback function

export type refreshTokenCallback = (param: {
  authToken?: string,
  authTokenExpireAt?: Date,
  refreshToken?: string,
  refreshTokenExpiresAt?: Date,
  authUserState: AuthStateUserObject | null,
}) => Promise<RefreshTokenCallbackResponse>

// createRefresh function parameter
export interface createRefreshParamInterface {
  interval: number,
  refreshApiCallback: refreshTokenCallback
}

export type refreshFunctionType = (param: createRefreshParamInterface)
  => createRefreshParamInterface
