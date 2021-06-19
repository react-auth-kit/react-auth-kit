import * as React from 'react';
import {AuthContext} from '../AuthProvider';
import checkAuthProvider from '../utils/checkAuthProvider';

/**
 *
 */
function useAuthHeader(): () => (string) {
  const c = React.useContext(AuthContext);
  checkAuthProvider(c);

  return () => {
    if (c?.authState) {
      return `${c.authState.authTokenType} ${c.authState.authToken}`;
    } else {
      return `Bearer `;
    }
  };
}

export default useAuthHeader;
