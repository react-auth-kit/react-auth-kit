import * as React from 'react';
import {AuthContext} from '../AuthProvider';
import {AuthStateUserObject} from '../types';
import checkAuthProvider from '../utils/checkAuthProvider';

/**
 * Auth State Hook
 *
 * @returns - Auth State Function
 */
function useAuthUser(): () => AuthStateUserObject | null {
  const context = React.useContext(AuthContext);
  checkAuthProvider(context);
  return () => {
    return context.authState.authState;
  };
}

export default useAuthUser;
