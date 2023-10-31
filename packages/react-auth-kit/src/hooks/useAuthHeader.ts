/**
 * 
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Authentication header <hook>
 * @copyright Arkadip Bhattacharya 2020
 * 
 */

import * as React from 'react';
import AuthContext from '../AuthContext';
import {AuthKitError} from '../errors';
import {isAuthenticated} from '../utils/utils';

/**
 *
 */
function useAuthHeader(): () => (string) {
  const c = React.useContext(AuthContext);
  if (c === null) {
    throw new
    AuthKitError('Auth Provider is missing. ' +
      'Please add the AuthProvider before Router');
  }


  return () => {
    const obj = c.value;
    if (!!obj.auth && isAuthenticated(obj)) {
      return `${obj.auth.type} ${obj.auth.token}`;
    } else {
      return ``;
    }
  };
}

export default useAuthHeader;
