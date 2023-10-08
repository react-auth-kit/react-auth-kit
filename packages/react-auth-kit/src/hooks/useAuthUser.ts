/**
 * 
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Authentication User <hook>
 * @copyright Arkadip Bhattacharya 2020
 * 
 */

import * as React from 'react';
import AuthContext from '../AuthContext';
import {AuthStateUserObject} from '../types';
import {AuthKitError} from '../errors';
import {isAuthenticated} from '../utils/utils';

/**
 * Auth State Hook
 *
 * @returns - Auth State Function
 */
function useAuthUser(): () => AuthStateUserObject | null {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new
    AuthKitError('Auth Provider is missing. ' +
      'Please add the AuthProvider before Router');
  }
  return () => {
    if (isAuthenticated(context.authState)) {
      return context.authState.userState;
    } else {
      // TODO: Need to signout and redirect to login
      return null;
    }
  };
}

export default useAuthUser;
