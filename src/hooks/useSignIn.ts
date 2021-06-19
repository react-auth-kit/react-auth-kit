/**
  *@author Arkadip Bhattacharya <in2arkadipb13@gmail.com>
  *@fileoverview Sign In functionality
  *@copyright Arkadip Bhattacharya 2020
  *@license Apache-2.0
  */

import * as React from 'react';
import AuthContext from '../AuthContext';
import {signInFunctionParams} from '../types';

/**
  *@function
  *@name useSignIn
  *@description Authentication SignIn Hook
  *@returns - Sign In function
  */
function useSignIn():(signInConfig: signInFunctionParams) => boolean {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new
    Error('Auth Provider is missing. ' +
      'Please add the AuthProvider before Router');
  }
  return (signInConfig: signInFunctionParams): boolean => {
    const {
      token,
      tokenType,
      authState,
      expiresIn,
      refreshToken,
      refreshTokenExpireIn,
    } = signInConfig;
    if ((refreshToken || refreshTokenExpireIn) &&
      !context.authState.isUsingRefreshToken) {
      throw new Error('The app doesn\'t implement \'refreshToken\' feature.\n' +
        'So you have to implement refresh token feature from ' +
        '\'AuthProvider\' before using it.');
    }

    const expTime = new Date(new Date().getTime() + expiresIn * 60 * 1000);
    const refreshTokenExpireAt = !!refreshTokenExpireIn ?
      new Date(new Date().getTime() + refreshTokenExpireIn * 60 * 1000) : null;

    try {
      if (context) {
        context.setAuthState((prevState) => ({
          ...prevState,
          authToken: token,
          authTokenType: tokenType,
          expireAt: expTime,
          authState: authState,
          refreshToken: !!refreshToken ? refreshToken : null,
          refreshTokenExpireAt: refreshTokenExpireAt,
        }));
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  };
}
/**
  *@exports useSignIn
  */
export default useSignIn;
