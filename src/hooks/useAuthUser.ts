import * as React from 'react';
import {AuthContext} from '../AuthProvider';

/**
 * Auth State Hook
 *
 * @returns - Auth State Function
 */
function useAuthUser(): () => object | null{
  const c = React.useContext(AuthContext);

  return () => {
    return c.authState.authState;
  };
}

export default useAuthUser;
