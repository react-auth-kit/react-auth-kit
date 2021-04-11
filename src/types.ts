import * as React from 'react';

export interface TokenInterface {
  authToken: string | null
  authTokenType: string | null
  expireAt: Date | null
  isUsingRefreshToken: boolean
  refreshToken: string | null
  refreshTokenExpireAt: Date | null
  authState: object | null
}

export interface signInFunctionParams {
  token: string
  tokenType: string | 'Bearer'
  expiresIn: number
  authState: object
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
  setAuthState: React.Dispatch<React.SetStateAction<TokenInterface>>
}

export interface AuthProviderProps {
  authType: 'cookie' | 'localstorage'
  authName: string,
  refreshToken?: boolean
  cookieDomain?: string
  cookieSecure?: boolean
  children: React.ReactNode
}
