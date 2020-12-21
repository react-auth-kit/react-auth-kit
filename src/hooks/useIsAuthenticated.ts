/**
  *@author Arkadip Bhattacharya <in2arkadipb13@gmail.com>
  *@fileoverview Check User is authenticated or not
  *@copyright Arkadip Bhattacharya 2020
  *@license Apache-2.0
  */

import * as React from 'react';
import {AuthContext} from '../AuthProvider';

/**
  *@function
  *@name useIsAuthenticated
  *@description check weather user is authenticated or not
  */
function useIsAuthenticated(): ()=>boolean {
  const context = React.useContext(AuthContext);

  return () => {
    if (context?.authState.authToken && context?.authState.expireAt) {
      if (new Date(context.authState.expireAt) > new Date()) {
        return true;
      } else {
        context.setAuthState({
          authToken: null,
          authTokenType: null,
          expireAt: null,
          authState: null,
          refreshToken: null,
          refreshTokenExpireAt: null
        });
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
