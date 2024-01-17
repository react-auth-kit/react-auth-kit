'use client';

import {useContext} from 'react';
import AuthContext from '../AuthContext';
import {AuthError} from '../errors';
import {isAuthenticated} from '../utils/utils';

/**
 * Is Authenticated React Hook
 *
 * Call the hook to know if the user is authenticated or not
 *
 * This uses the context data to determine whether the user is authenticated
 * or not.
 *
 * @returns React Hook with Authtication status Functionility.
 *
 * @throws AuthError
 * Thrown if the Hook is used outside the Provider Scope.
 *
 * @example
 * ```js
 * import useSignIn from 'react-auth-kit/hooks/useSignIn'
 *
 * const Component = () => {
 *  const isAuthenticated = useIsAuthenticated()
 *  if (isAuthenticated()) {
 *    // user authenticated - do somthing
 *  }
 *  else {
 *    // user not authenticated
 *  }
 * ```
 *
 */
function useIsAuthenticated(): ()=>boolean {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new
    AuthError(
        'Auth Provider is missing. ' +
        'Make sure, you are using this hook inside the auth provider.',
    );
  }
  /**
   * @returns - Whether the current user is signed in or not
   */
  return () => {
    if (!isAuthenticated(context.value)) {
      return false;
    } else {
      return true;
    }
  };
}

export default useIsAuthenticated;
