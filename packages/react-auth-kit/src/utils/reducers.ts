import { AuthKitSetState, SignInActionPayload, RefreshTokenActionPayload } from '../types';

/**
 * used to make sign in
 * @param signInParams
 */
export function doSignIn<T>(signInParams: SignInActionPayload<T>): AuthKitSetState<T> {
  const authType = !!signInParams.auth.type ? signInParams.auth.type : 'Bearer';
  const authToken = signInParams.auth.token;

  return {
    auth: {
      token: authToken,
      type: authType
    },
    refresh: signInParams.refresh,
    userState: signInParams.userState || {} as any
  };
}

/**
 * used to refresh the Token
 * @param refreshTokenParam
 */
export function doRefresh<T>(refreshTokenParam: RefreshTokenActionPayload<T>):
  AuthKitSetState<T> {
  return {
    auth: {
      token: refreshTokenParam.newAuthToken!,
      type: 'Bearer'
    }
  };
}

/**
 * Used to make sign out
 */
export function doSignOut<T>(): AuthKitSetState<T> {
  return {
    auth: null
  };
}
