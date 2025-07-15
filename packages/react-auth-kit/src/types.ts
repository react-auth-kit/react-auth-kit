/**
 * Parameters for SignIn Action
 */
export interface SignInActionPayload<T> {
  /**
   * Authentication object
   */
  auth: {

    /**
     * Access token
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
   * refresh token.
   *
   * Make sure you are using a refresh token and configured the `createRefresh`
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
type AuthKitStateInterfaceSignedIn<T> = {

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
   * User state
   */
  userState: T | null,

  /**
   * Boolean value to know if the user is signed in or not
   */
  isSignIn: true
}

/**
 * Auth State Object
 * 1. when the user is authenticated
 * 2. Refresh token can be there or not
 * 3. User state can be there or not
 */
type AuthKitStateInterfaceSignedOut = {

  /**
   * Authentication part of the State
   */
  auth: null

  /**
   * User state
   */
  userState: null,

  /**
   * Boolean value to know if the user is signed in or not
   */
  isSignIn: false,
}

export type AuthKitStateInterfaceAuthToken<T> = AuthKitStateInterfaceSignedIn<T> | AuthKitStateInterfaceSignedOut

/**
 * Auth State Object
 * 1. when the user is authenticated
 * 2. Refresh token can be there or not
 * 3. User state can be there or not
 */
type AuthKitStateInterfaceWithRefresh = {
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
   * If the current system is using refresh token or not
   */
  isUsingRefreshToken: true,
}

/**
 * Auth State Object
 * 1. when the user is authenticated
 * 2. Refresh token can be there or not
 * 3. User state can be there or not
 */
type AuthKitStateInterfaceWithoutRefresh = {
  /**
   * Auth Refresh token part
   */
  refresh: null,

  /**
   * If the current system is using refresh token or not
   */
  isUsingRefreshToken: false,
}

type AuthKitStateInterfaceRefresh = AuthKitStateInterfaceWithRefresh | AuthKitStateInterfaceWithoutRefresh


/**
 * Auth State Object
 */
export type AuthKitState<T> =
  AuthKitStateInterfaceAuthToken<T> &
  AuthKitStateInterfaceRefresh;
