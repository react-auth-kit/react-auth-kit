import {AuthKitSetState, SignInActionPayload, RefreshTokenActionPayload} from '../types';

/**
 * used to make sign in
 * @param signInParams
 */
export function doSignIn<T>(signInParams: SignInActionPayload<T>): AuthKitSetState<T> {
  const authType = signInParams.auth.type ? signInParams.auth.type : 'Bearer';
  const authToken = signInParams.auth.token;

  return {
    auth: {
      token: authToken,
      type: authType,
    },
    refresh: signInParams.refresh,
    userState: signInParams.userState || {} as any,
  };
}

/**
 * used to refresh the Token
 * @param refreshTokenParam
 */
export function doRefresh<T>(refreshTokenParam: RefreshTokenActionPayload<T>):
  AuthKitSetState<T> {
  if (refreshTokenParam.newAuthToken) {
    let ret : AuthKitSetState<T>= {
      auth: {
        token: refreshTokenParam.newAuthToken!,
        type: refreshTokenParam.newAuthTokenType ? refreshTokenParam.newAuthTokenType : 'Bearer',
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
  } else if (refreshTokenParam.newRefreshToken) {
    const ret = {
      refresh: refreshTokenParam.newRefreshToken,
    };
    return ret;
  } else {
    return {
      auth: null,
      refresh: null,
    };
  }
}

/**
 * Used to make sign out
 */
export function doSignOut<T>(): AuthKitSetState<T> {
  return {
    auth: null,
  };
}
