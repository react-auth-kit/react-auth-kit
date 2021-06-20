import * as React from 'react';
import AuthContext from '../AuthContext';
import {AuthStateUserObject} from '../types';

/**
 * Auth State Hook
 *
 * @returns - Auth State Function
 */
function useAuthUser(): () => AuthStateUserObject | null {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new
    Error('Auth Provider is missing. ' +
      'Please add the AuthProvider before Router');
  }
  return () => {
    return context.authState.authState;
  };
}

export default useAuthUser;
