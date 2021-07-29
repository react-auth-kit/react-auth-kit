import * as React from 'react';
import {AuthActions} from "./utils/actions";

export interface TokenInterface {
  authToken: string | null
  authTokenType: string | null
  expireAt: Date | null
  isUsingRefreshToken: boolean
  refreshToken: string | null
  refreshTokenExpireAt: Date | null
  authState: AuthStateUserObject | null
}

export interface signInFunctionParams {
  token: string
  tokenType: string | 'Bearer'
  expiresIn: number
  authState: AuthStateUserObject
  refreshToken?: string
  refreshTokenExpireIn?: number
}

export interface TokenObjectParamsInterface {
  authStorageType: 'cookie' | 'localstorage'
  authStorageName: string,
  authTimeStorageName: string
  stateStorageName: string
  refreshTokenName?: string
  cookieDomain?: string
  cookieSecure?: boolean
}

export interface AuthContextInterface {
  authState: TokenInterface
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
