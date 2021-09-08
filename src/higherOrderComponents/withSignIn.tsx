/**
 * @author Arkadip Bhattacharya <in2arkadipb13@gmail.com>
 * @fileoverview Sign In functionality <Higher Order Component>
 * @copyright Arkadip Bhattacharya 2020
 *
 * Copyright 2020 Arkadip Bhattacharya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as React from 'react';
import {AuthContextConsumer} from '../AuthContext';
import {signInFunctionParams} from '../types';
import {doSignIn} from '../utils/reducers';

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
            Error('Auth Provider is missing. ' +
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
                  userState: authState,
                  refresh: {
                    token: refreshToken,
                    expiresAt: refreshTokenExpireAt,
                  },
                }));
                return true;
              } else {
                // refresh token params are not provided
                // throw an error
                throw new Error('Make sure you given "refreshToken" and  ' +
                  '"refreshTokenExpireIn" parameter');
              }
            } else {
              // Not using refresh token
              if (!!refreshToken && !!refreshTokenExpireIn) {
                // params are not expected but provided
                // throw an error
                throw new Error('The app doesn\'t implement \'refreshToken\'' +
                  ' feature.\n So you have to implement refresh token feature' +
                  ' from \'AuthProvider\' before using it.');
              } else {
                // sign in without the refresh token
                c.dispatch(doSignIn({
                  auth: {
                    token: token,
                    type: tokenType,
                    expiresAt: expTime,
                  },
                  userState: authState,
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
