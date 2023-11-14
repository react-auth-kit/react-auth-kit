/**
 *
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Sign In functionality <Higher Order Component>
 * @copyright Arkadip Bhattacharya 2020
 *
 */

import * as React from 'react';
import AuthContext from '../AuthContext';
import {signInFunctionParams} from '../types';
import {doSignIn} from '../utils/reducers';
import {AuthError} from '../errors';

/**
 * @interface withSignInProps
 */
interface withSignInProps<T> {
    signIn(signInConfig: signInFunctionParams<T>): boolean
}

/**
 * @public
 * @function
 * @name withSignIn
 * @description Inject sign in functionality inside the Component's Prop
 * @param Component
 */
function withSignIn<T, P extends withSignInProps<T>>(
    Component: React.ComponentType<P>,
):React.FunctionComponent<P> {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new
    AuthError(
        'Auth Provider is missing. ' +
        'Make sure, you are using this component inside the auth provider.',
    );
  }

  const signIn = (signInConfig: signInFunctionParams<T>): boolean => {
    if (context.value.isUsingRefreshToken) {
      // Using the power of refresh token
      if (signInConfig.refresh) {
        // refresh token params are provided
        // sign in with refresh token
        context.set(doSignIn(signInConfig));
        return true;
      } else {
        // refresh token params are not provided
        // throw an error
        throw new AuthError('Make sure you given "refreshToken" and  ' +
          '"refreshTokenExpireIn" parameter');
      }
    } else {
      // Not using refresh token
      if (signInConfig.refresh) {
        // params are not expected but provided
        // throw an error
        throw new Error('The app doesn\'t implement \'refreshToken\' ' +
          'feature.\nSo you have to implement refresh token feature ' +
          'from \'AuthProvider\' before using it.');
      } else {
        // sign in without the refresh token
        context.set(doSignIn(signInConfig));
        return true;
      }
    }
  };

  return (props) => {
    return (
      <Component {...props} signIn={signIn}/>
    );
  };
}

export default withSignIn;
