/**
 * 
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview General types used in the library
 * @copyright Arkadip Bhattacharya 2020
 *
 */

import * as React from 'react';
// import { AuthActions } from './utils/actions';

/**
 * Universal types
 */
export type AuthStateUserObject = {
  [x: string]: any;
}

export interface SignInActionPayload<T> {
  auth: {
    token: string,
    type?: string
  },
  refresh?: string | null,
  userState?: T,
}

export interface RefreshTokenActionPayload<T> {
  newAuthToken: string | null,
  newRefreshToken?: string | null,
  newAuthUserState?: T | null
}

export interface AuthKitSetState<T> {
  auth?: {
    token: string,
    type: string
  } | null,
  refresh?: string | null,
  userState?: T
}

interface AuthKitStateInterfaceTrue<T> {
  auth: {
    token: string,
    type: string,
    expiresAt: Date
  },
  refresh: {
    token: string,
    expiresAt: Date
  } | null,
  userState: T | null,
  isSignIn: boolean,
  isUsingRefreshToken: boolean,
}

interface AuthKitStateInterfaceNoAuthOnlyRefresh {
  auth: null,
  refresh: {
    token: string,
    expiresAt: Date
  },
  userState: null,
  isSignIn: boolean,
  isUsingRefreshToken: boolean,
}


interface AuthKitStateInterfaceFalse {
  auth: null,
  refresh: null,
  userState: null,
  isSignIn: boolean,
  isUsingRefreshToken: boolean,
}

export type AuthKitStateInterface<T> = AuthKitStateInterfaceTrue<T> | AuthKitStateInterfaceFalse | AuthKitStateInterfaceNoAuthOnlyRefresh


/**
 * SignIn function param
 * Used by: useSignIn and withSignIn
 */
export type signInFunctionParams<T> = SignInActionPayload<T>

/**
 * Context values type
 */
// export interface AuthContextInterface<T> {
//   authState: AuthKitStateInterface<T>
//   dispatch: React.Dispatch<AuthActions>
// }

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
