/**
 * 
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Sign In functionality <Higher Order Component>
 * @copyright Arkadip Bhattacharya 2020
 * 
 */

import * as React from 'react';
import {AuthContextConsumer} from '../AuthContext';
import {signInFunctionParams} from '../types';
import {doSignIn} from '../utils/reducers';
import {AuthKitError} from '../errors';

/**
 * @interface withSignInProps
 */
interface withSignInProps {
    signIn(params: signInFunctionParams): boolean
}

/**
 * @public
 * @function
 * @name withSignIn
 * @description Inject sign in functionality inside the Component's Prop
 * @param Component
 */
function withSignIn<P extends withSignInProps>(
    Component: React.ComponentType<P>,
):React.FunctionComponent<P> {
  return (props) => {
    return (
      <AuthContextConsumer>
        {(c) => {
          if (c === null) {
            throw new
            AuthKitError('Auth Provider is missing. ' +
              'Please add the AuthProvider before Router');
          }
          const signIn = (signInConfig: signInFunctionParams)
            : boolean => {
            const {
              token,
              tokenType,
              authState,
              expiresIn,
              refreshToken,
              refreshTokenExpireIn,
            } = signInConfig;
            const expTime =
              new Date(new Date().getTime() + expiresIn * 60 * 1000);
            if (c.authState.isUsingRefreshToken) {
              // Using the power of refresh token
              if (!!refreshToken && !!refreshTokenExpireIn) {
                // refresh token params are provided
                // sign in with refresh token
                const refreshTokenExpireAt = new Date(new Date().getTime() +
                  refreshTokenExpireIn * 60 * 1000);
                c.dispatch(doSignIn({
                  auth: {
                    token: token,
                    type: tokenType,
                    expiresAt: expTime,
                  },
                  userState: authState ? authState : null,
                  refresh: {
                    token: refreshToken,
                    expiresAt: refreshTokenExpireAt,
                  },
                }));
                return true;
              } else {
                // refresh token params are not provided
                // throw an error
                throw new AuthKitError('Make sure you given "refreshToken"'+
                ' and "refreshTokenExpireIn" parameter');
              }
            } else {
              // Not using refresh token
              if (!!refreshToken && !!refreshTokenExpireIn) {
                // params are not expected but provided
                // throw an error
                throw new AuthKitError('The app doesn\'t implement ' +
                  '\'refreshToken\' feature.\n So you have to'+
                  ' implement refresh token feature' +
                  ' from \'AuthProvider\' before using it.');
              } else {
                // sign in without the refresh token
                c.dispatch(doSignIn({
                  auth: {
                    token: token,
                    type: tokenType,
                    expiresAt: expTime,
                  },
                  userState: authState ? authState : null,
                  refresh: null,
                }));
                return true;
              }
            }
          };
          return <Component {...props} signIn={signIn}/>;
        }}
      </AuthContextConsumer>
    );
  };
}

export default withSignIn;
