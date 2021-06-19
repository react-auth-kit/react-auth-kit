/**
  *@author Arkadip Bhattacharya <in2arkadipb13@gmail.com>
  *@fileoverview Sign Out functionality
  *@copyright Arkadip Bhattacharya 2020
  *@license Apache-2.0
  */

import * as React from 'react';
import AuthContext from '../AuthContext';

/**
  *@public
  *@function
  *@name useSignOut
  *@description Signout Hook
  */
function useSignOut(): () => (boolean) {
  /**
   *A constant c.
   *@kind constant
   */
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new
    Error('Auth Provider is missing. ' +
      'Please add the AuthProvider before Router');
  }

  return () => {
    try {
      if (context?.authState.authToken) {
        context.setAuthState((prevState) => ({
          ...prevState,
          authToken: null,
          authTokenType: null,
          expireAt: null,
          authState: null,
          refreshToken: null,
          refreshTokenExpireAt: null,
        }));
        console.log('RAJ :: Signing Out');
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
