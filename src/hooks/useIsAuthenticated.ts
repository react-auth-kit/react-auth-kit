/**
  *@author Arkadip Bhattacharya <in2arkadipb13@gmail.com>
  *@fileoverview Check User is authenticated or not
  *@copyright Arkadip Bhattacharya 2020
  *@license Apache-2.0
  */

import * as React from 'react';
import AuthContext from '../AuthContext';
import {doSignOut} from '../utils/reducers';

/**
  *@function
  *@name useIsAuthenticated
  *@description check weather user is authenticated or not
  */
function useIsAuthenticated(): ()=>boolean {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new
    Error('Auth Provider is missing. ' +
      'Please add the AuthProvider before Router');
  }
  return () => {
    if (context?.authState.authToken && context?.authState.expireAt) {
      if (new Date(context.authState.expireAt) > new Date()) {
        React.useDebugValue(`true`);
        return true;
      } else {
        React.useDebugValue(`false`);
        context.dispatch(doSignOut());
        return false;
      }
    } else {
      return false;
    }
  };
}
/**
  *@exports useIsAuthenticated
  */
export default useIsAuthenticated;
