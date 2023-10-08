/**
 * 
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview General types used in the library
 * @copyright Arkadip Bhattacharya 2020
 *
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
  authState?: AuthStateUserObject
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
