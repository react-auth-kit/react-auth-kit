/**
 *
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview General types used in the library
 * @copyright Arkadip Bhattacharya 2020
 *
 */

export interface SignInActionPayload<T> {
  auth: {
    token: string,
    type?: string
  },
  refresh?: string | null,
  userState?: T,
}

export interface RefreshTokenActionPayload<T> {
  newAuthToken?: string,
  newAuthTokenType?: string,
  newRefreshToken?: string,
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
 * Refresh Token Callback Response
 */
export type RefreshTokenCallbackResponse<T> = {
  isSuccess: boolean,
  newAuthToken: string,
  newRefreshToken?: string,
  newAuthUserState?: T | null,
};

/**
 * Refresh Token types
 */
// Callback function

export type refreshTokenCallback<T> = (param: {
  authToken?: string,
  refreshToken?: string,
  authUserState: T | null,
}) => Promise<RefreshTokenCallbackResponse<T>>

// createRefresh function parameter
export interface createRefreshParamInterface<T> {
  interval: number,
  refreshApiCallback: refreshTokenCallback<T>
}

export type refreshFunctionType<T> = (param: createRefreshParamInterface<T>)
  => createRefreshParamInterface<T>
