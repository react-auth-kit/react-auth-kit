/**
  *@author Arkadip Bhattacharya <in2arkadipb13@gmail.com>
  *@fileoverview Authentication Header
  *@copyright Arkadip Bhattacharya 2020
  *@license Apache-2.0
  */

import * as React from 'react';
import {AuthContext} from '../AuthProvider';

/**
  *@function
  *@name useAuthHeader
  */
function useAuthHeader(): () => (string) {
  const c = React.useContext(AuthContext);
  return () => {
    if (c?.authState) {
      return `${c.authState.authTokenType} ${c.authState.authToken}`;
    } else {
      return `Bearer `;
    }
  };
}
/**
  *@exports useAuthHeader
  */
export default useAuthHeader;
