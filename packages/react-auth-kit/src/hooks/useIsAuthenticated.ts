'use client';

import {
  useReactAuthKit,
  useReactAuthKitConfig,
  useReactAuthKitRouter,
} from '../AuthContext';

import {doSignOut} from '../utils/reducers';

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
 *  if (isAuthenticated) {
 *    // user authenticated - do somthing
 *  }
 *  else {
 *    // user not authenticated
 *  }
 * ```
 *
 */
function useIsAuthenticated(): () => boolean {
  const {value, set} = useReactAuthKit();
  const router = useReactAuthKitRouter();
  const {fallbackPath} = useReactAuthKitConfig();

  const navigate = router ? router.useNavigate() : null;
  const path = router ? router.usePath() : null;


  return () => {
    if (value.auth && new Date(value.auth.expiresAt) > new Date()) {
      return true;
    }

    if (value.auth && new Date(value.auth.expiresAt) <= new Date()) {
      set(doSignOut());
    }

    if (router && navigate && fallbackPath && path && path() !== fallbackPath) {
      navigate({to: fallbackPath});
    }
    return false;
  };
}

export default useIsAuthenticated;
