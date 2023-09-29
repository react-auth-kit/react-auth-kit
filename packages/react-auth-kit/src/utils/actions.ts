/**
 * @author Arkadip Bhattacharya <in2arkadipb13@gmail.com>
 * @fileoverview Actions for useReducer
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

import {AuthStateUserObject} from '../types';

export enum ActionType {
  SignIn,
  SignOut,
  RefreshToken
}

export interface SignInActionPayload {
  auth: {
    token: string,
    type: string,
    expiresAt: Date
  },
  refresh: {
    token: string,
    expiresAt: Date
  } | null,
  userState: AuthStateUserObject | null,
}

export interface RefreshTokenActionPayload {
  newAuthToken: string | null,
  newAuthTokenExpireIn?: number | null,
  newRefreshToken?: string | null,
  newRefreshTokenExpiresIn?: number | null,
  newAuthUserState?: AuthStateUserObject | null
}

export interface SignInAction {
  type: ActionType.SignIn,
  payload: SignInActionPayload
}

export interface RefreshTokenAction {
  type: ActionType.RefreshToken,
  payload: RefreshTokenActionPayload
}

export interface SignOutAction {
  type: ActionType.SignOut;
}

export type AuthActions = SignInAction | SignOutAction | RefreshTokenAction
