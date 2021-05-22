import * as React from 'react';
import {AuthContext} from '../AuthContext';

/**
 *
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

export default useAuthHeader;
