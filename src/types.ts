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

export interface AuthKitStateInterface {
  authToken: string | null
  authTokenType: string | null
  expireAt: Date | null
  isUsingRefreshToken: boolean
  refreshToken: string | null
  refreshTokenExpireAt: Date | null
  authState: AuthStateUserObject | null
  isSignIn: boolean
}

// interface xx {
//   auth: {
//     token: string,
//     type: string,
//     expiresAt: Date
//   } | null,
//   refresh: {
//     token: string,
//     expiresAt: Date
//   } | null,
//   userState: AuthStateUserObject | null,
//   isSignIn: boolean
//   isUsingRefreshToken: boolean,
//   typeOfStorage: "cookie" | "localstorage"
// }

export interface signInFunctionParams {
  token: string
  tokenType: string | 'Bearer'
  expiresIn: number
  authState: AuthStateUserObject
  refreshToken?: string
  refreshTokenExpireIn?: number
}

export interface AuthContextInterface {
  authState: AuthKitStateInterface
  dispatch: React.Dispatch<AuthActions>
}

export interface AuthProviderProps {
  authType: 'cookie' | 'localstorage'
  authName: string,
  refreshToken?: boolean
  cookieDomain?: string
  cookieSecure?: boolean
  children: React.ReactNode
}

export type AuthStateUserObject = {
  [x: string]: any;
}
