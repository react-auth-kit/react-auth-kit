/**
 * 
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Sign Out functionality <Hook>
 * @copyright Arkadip Bhattacharya 2020
 *
 */

import * as React from 'react';
import AuthContext from '../AuthContext';
import {doSignOut} from '../utils/reducers';
import {AuthKitError} from '../errors';

/**
  *@public
  *@function
  *@name useSignOut
  *@description Sign out Hook
  */
function useSignOut(): () => (boolean) {
  /**
   *A constant c.
   *@kind constant
   */
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new
    AuthKitError('Auth Provider is missing. ' +
      'Please add the AuthProvider before Router');
  }

  return () => {
    try {
      if (context) {
        context.dispatch(doSignOut());
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };
}
/**
  *@exports useSignOut
  */
export default useSignOut;
