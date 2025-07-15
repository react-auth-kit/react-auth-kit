'use client';

import {useReactAuthKitStore} from '../AuthContext';
import useIsAuthenticated from './useIsAuthenticated';

/**
 * useAuthHeader React Hook
 *
 * This hook retrieves the authentication header for network requests.
 *
 * If the user is authenticated, it returns a string in the format `type token`.
 * If the user is not authenticated, it signs out the user and redirects to a fallback path if configured, or returns `null`.
 *
 * @returns A function that returns the authentication header string or `null`.
 *
 * @example
 * ```jsx
 * import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
 * const Component = () => {
 *  const getAuthHeader = useAuthHeader();
 *  const headers = {
 *   'Authorization': getAuthHeader();
 *  };
 * }
 * ```
 */
function useAuthHeader(): () => string | null {
  const {value} = useReactAuthKitStore();
  const isAuthenticated = useIsAuthenticated();
  return () => {
    if (!!value.auth && isAuthenticated()) {
      return `${value.auth.type} ${value.auth.token}`;
    } else {
      return null;
    }
  };
}

export default useAuthHeader;
