/**
 * 
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Authentication status <hook>
 * @copyright Arkadip Bhattacharya 2020
 * 
 */

import * as React from 'react';
import AuthContext from '../AuthContext';
import {AuthKitError} from '../errors';
import {isAuthenticated} from '../utils/utils';

/**
  *@function
  *@name useIsAuthenticated
  *@description check weather user is authenticated or not
  */
function useIsAuthenticated(): ()=>boolean {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new
    AuthKitError('Auth Provider is missing. ' +
      'Please add the AuthProvider before Router');
  }
  return () => {
    if (!isAuthenticated(context.value())) {
      return false;
    } else {
      return true;
    }
  };
}
/**
  *@exports useIsAuthenticated
  */
export default useIsAuthenticated;
