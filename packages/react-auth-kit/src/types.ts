/**
 * Parameters for SignIn Action
 */
export interface SignInActionPayload<T> {
  /**
   * Authentication object
   */
  auth: {

    /**
     * JWT access token
     */
    token: string,

    /**
     * `type` or `prefix` of the token, to be used in the Network Request
     *
     * @example
     * Bearer
     */
    type?: string
  },

  /**
   * JWT refresh token.
   *
   * Make sure, you are using refresh token and configured the `createRefresh`
   * before adding the token
   */
  refresh?: string | null,

  /**
   * User information
   */
  userState?: T,

  /**
   * Path to Redirect after logging in
   */
  navigateTo?: string
}

/**
 * Parameters used by the Sign In function
 */
export type signInFunctionParams<T> = SignInActionPayload<T>

/**
 * Auth State Object
 * 1. when the user is authenticated
 * 2. Refresh token can be there or not
 * 3. User state can be there or not
 */
interface AuthKitStateInterfaceTrue<T> {

  /**
   * Authentication part of the State
   */
  auth: {

    /**
     * Auth access token
     */
    token: string,

    /**
     * Type of the Token
     *
     * @example
     * Bearer
     */
    type: string,

    /**
     * Expiry time of the auth token
     */
    expiresAt: Date
  },

  /**
   * Auth Refresh token part
   */
  refresh: {

    /**
     * Refresh token
     */
    token: string,

    /**
     * Expiry time of the Refresh token
     */
    expiresAt: Date
  } | null,

  /**
   * User state
   */
  userState: T | null,

  /**
   * Boolean value to know if the user is signed in or not
   */
  isSignIn: boolean,

  /**
   * If the current system is using refresh token or not
   */
  isUsingRefreshToken: boolean,
}

/**
 * Auth State Object
 * 1. when the user is not authenticated
 * 2. Refresh token is there
 * 3. User state is null
 */
interface AuthKitStateInterfaceNoAuthOnlyRefresh {

  /**
   * Authentication part of the State
   */
  auth: null,

  /**
   * Auth Refresh token part
   */
  refresh: {

    /**
     * Refresh token
     */
    token: string,

    /**
     * Expiry time of the Refresh token
     */
    expiresAt: Date
  },

  /**
   * User State
   */
  userState: null,

  /**
   * Boolean value to know if the user is signed in or not
   */
  isSignIn: boolean,

  /**
   * If the current system is using refresh token or not
   */
  isUsingRefreshToken: boolean,
}

/**
 * Auth State Object
 * 1. when the user is not authenticated
 * 2. Refresh token is null
 * 3. User state is null
 */
interface AuthKitStateInterfaceFalse {

  /**
   * Authentication part of the State, which is null
   */
  auth: null,

  /**
   * Refresh token part, which is null
   */
  refresh: null,

  /**
   * User state, which is null
   */
  userState: null,

  /**
   * Is Sign In, which is false
   */
  isSignIn: boolean,

  /**
   * If the current system is using refresh token or not
   */
  isUsingRefreshToken: boolean,
}

/**
 * Auth State Object
 */
export type AuthKitStateInterface<T> =
  AuthKitStateInterfaceTrue<T> |
  AuthKitStateInterfaceFalse |
  AuthKitStateInterfaceNoAuthOnlyRefresh;
