/**
  *@author Arkadip Bhattacharya <in2arkadipb13@gmail.com>
  *@fileoverview Authentication
  *@copyright Arkadip Bhattacharya 2020
  *@license Apache-2.0
  */


import * as React from 'react';
import AuthContext from '../AuthContext';
import {signInFunctionParams} from '../types';
import {doSignIn, doSignOut} from "../utils/reducers";

/**
  *@public
  *@function
  *@name useAuth
  */
function useAuth():
  {
    authHeader: () => (string | null),
    signIn: (signInConfig: signInFunctionParams) => boolean,
    signOut: () => (boolean); isAuthenticated: () => (boolean),
    authUser: () => (object | null)
    } {
  /**
    *A constant c.
    *@kind constant
    */
  const c = React.useContext(AuthContext);
  if (c === null) {
    throw new
    Error('Auth Provider is missing. ' +
      'Please add the AuthProvider before Router');
  }

  /** @function
    * @name authHeader
    * @description Get Auth header
    * @returns authheader AuthHeader
    */
  const authHeader = (): string => {
    if (c?.authState) {
      return `${c.authState.authTokenType} ${c.authState.authToken}`;
    } else {
      return `Bearer `;
    }
  };

  /** @function
     *@name authUser
     *@description Get Auth user State
     *@returns authuser state
     */
  const authUser = (): (object | null) => {
    return c.authState.authState;
  };

  /**
     *@function
     *@name isAuthenticated
     *@description Get If the user is Authenticated
     *@returns true | false
     */
  const isAuthenticated = () => {
    if (c?.authState.authToken && c?.authState.expireAt) {
      if (new Date(c.authState.expireAt) > new Date()) {
        return true;
      } else {
        c.dispatch(doSignOut())
        return false;
      }
    } else {
      return false;
    }
  };

  /**
     *@function
     *@name signIn
     *@param signInConfig
     *@returns true if sign-in else false
     */
  const signIn = (signInConfig: signInFunctionParams): boolean => {
    const {
      token,
      tokenType,
      authState,
      expiresIn,
      refreshToken,
      refreshTokenExpireIn,
    } = signInConfig;

    if ((refreshToken || refreshTokenExpireIn) &&
      !c.authState.isUsingRefreshToken) {
      throw new Error('The app doesn\'t implement \'refreshToken\' feature.\n' +
        'So you have to implement refresh token feature from ' +
        '\'AuthProvider\' before using it.');
    }
    const expTime = new Date(new Date().getTime() + expiresIn * 60 * 1000);
    const refreshTokenExpireAt = !!refreshTokenExpireIn ?
      new Date(new Date().getTime() + refreshTokenExpireIn * 60 * 1000) : null;
    try {
      if (c) {
        c.dispatch(doSignIn({
          authToken: token,
          authTokenType: tokenType,
          expireAt: expTime,
          authState: authState,
          refreshToken: !!refreshToken ? refreshToken : null,
          refreshTokenExpireAt: refreshTokenExpireAt,
        }))
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  /**
     *@function
     *@name signOut
     *@returns true | false
     */
  const signOut = () => {
    try {
      if (c?.authState.authToken) {
        c.dispatch(doSignOut())
        console.log('RAJ :: Signing Out');
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };

  return {authHeader, isAuthenticated, authUser, signOut, signIn};
}

/**
  *@exports useAuth
  */
export default useAuth;
