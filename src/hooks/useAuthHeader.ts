import * as React from 'react';
import {AuthContext} from '../AuthProvider';

/**
 *
 */
function useAuthHeader(): string {
  const c = React.useContext(AuthContext);

  if (c?.authState) {
    return `${c.authState.authTokenType} ${c.authState.authToken}`;
  } else {
    return `Bearer `;
  }
}

export default useAuthHeader;
