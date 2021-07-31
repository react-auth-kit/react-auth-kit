import * as React from 'react';
import AuthContext from '../AuthContext';

/**
 *
 */
function useAuthHeader(): () => (string) {
  const c = React.useContext(AuthContext);
  if (c === null) {
    throw new
    Error('Auth Provider is missing. ' +
      'Please add the AuthProvider before Router');
  }


  return () => {
    if (c?.authState) {
      const h = `${c.authState.authTokenType} ${c.authState.authToken}`;
      React.useDebugValue(`Header: ${h}`);
      return h;
    } else {
      React.useDebugValue(`Not authenticated`);
      return ``;
    }
  };
}

export default useAuthHeader;
