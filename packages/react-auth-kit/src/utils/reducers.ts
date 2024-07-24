/**
 * @packageDocumentation
 *
 * Reducer Module
 *
 * It contains all the reducers
 *
 * @remarks
 * A reducer is a function that takes input from the user
 * and converts to the actual state object,
 * that can be processed by React Auth Kit state system.
 *
 */

import type {
  SignInActionPayload,
} from '../types';

import type {
  RefreshTokenActionPayloadTrue,
} from '../createRefresh';

import type {
  AuthKitSetState,
} from '../RxTokenObject';

/**
 * @internal
 *
 * Do Sign In reducer.
 * It is used to convert the incoming payload into
 * the specified format for the auth state.
 * It doesn't contains any important buisness logic.
*
 * @typeParam T - Type of User State Object
 * @param signInParams - Sign in parameters
 * @returns Object that is modified to auth state to used further
 *
 * @remarks
 * - If the `auth.type` is not set, then by default it is set as `Bearer`
 * - If the `userState` is not set, then by default it is `{}` (an empty object)
 *
 */
export function doSignIn<T>(
    signInParams: SignInActionPayload<T>,
): AuthKitSetState<T> {
  const authType = signInParams.auth.type || 'Bearer';
  const authToken = signInParams.auth.token;

  return {
    auth: {
      token: authToken,
      type: authType,
    },
    refresh: signInParams.refresh,
    userState: signInParams.userState || {} as T,
  };
}

/**
 * Do refresh reducer
 * When the token is refrshed,
 * this reducer is used to convert the incoming data from
 * the refresh token functionality.
 *
 * @remarks
 *
 * Here is the internal decision graph
 * ```
 * refreshTokenParam
 *        |
 *        |-- new auth token -------------------------> Update the auth data
 *        |                   |
 *        |                   |
 *        |                   |-- new user state -----> Add user state in
 *        |                   |                         the updated auth data
 *        |                   |
 *        |                   |-- new refresh token --> Add new refresh token in
 *        |                                             the updated auth state
 *        |
 *        |-- No auth token only refresh token -------> Update the refresh token
 *        |
 *        |
 *        --- No auth token and refresh token --------> Make everything Null
 * ```
 *
 * @param refreshTokenParam - Parameters set by the
 * refresh token called
 * @returns Object that is modified to auth state to used
 * further to set the refreshed auth states
 *
 * @internal
 *
 * @typeParam T - Type of User State Object
 */
export function doRefresh<T>(refreshTokenParam: RefreshTokenActionPayloadTrue<T>):
  AuthKitSetState<T> {
  let ret : AuthKitSetState<T>= {
    auth: {
      token: refreshTokenParam.newAuthToken,
      type: refreshTokenParam.newAuthTokenType || 'Bearer',
    },
  };
  if (refreshTokenParam.newAuthUserState) {
    ret = {
      ...ret,
      userState: refreshTokenParam.newAuthUserState,
    };
  }
  if (refreshTokenParam.newRefreshToken) {
    ret = {
      ...ret,
      refresh: refreshTokenParam.newRefreshToken,
    };
  }
  return ret;
}

/**
 * Do sign out reducer
 * Called Internally to make the auth state signed out
 *
 * @returns Object that is modified to be used further to
 * update the auth state to make it signed out
 *
 * @internal
 *
 * @typeParam T - Type of User State Object
 *
 */
export function doSignOut<T>(): AuthKitSetState<T> {
  return {
    auth: null,
  };
}
