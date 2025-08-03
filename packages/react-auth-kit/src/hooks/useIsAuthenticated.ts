'use client';

import {
  useReactAuthKitStore,
  useReactAuthKitConfig,
  useReactAuthKitRouter,
} from '../AuthContext';

import Action from "../utils/action";

/**
 * useIsAuthenticated React Hook
 *
 * This hook checks if the user is authenticated by verifying the authentication token's expiration time.
 * If the token is valid, it returns true; otherwise, it signs out the user and redirects to a fallback path if configured.
 *
 * @returns A function that returns a boolean indicating whether the user is authenticated.
 *
 * @example
 * ```js
 * import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
 * const Component = () => {
 *  const isAuthenticated = useIsAuthenticated();
 *  if (isAuthenticated) {
 *    // User is authenticated - proceed with authenticated actions
 *  } else {
 *    // User is not authenticated - auto redirect or show login
 *  }
 * }
 * ```
 *
 */
function useIsAuthenticated(): boolean {
  const store = useReactAuthKitStore();
  const router = useReactAuthKitRouter();
  const {fallbackPath} = useReactAuthKitConfig();

  const navigate = router ? router.useNavigate() : null;
  const path = router ? router.usePath() : null;

  if (store.value.auth && new Date(store.value.auth.expiresAt) > new Date()) {
    return true;
  }

  if (store.value.auth && new Date(store.value.auth.expiresAt) <= new Date()) {
    Action.doSignOut(store)
  }

  if (router && navigate && fallbackPath && path && path() !== fallbackPath) {
    navigate({to: fallbackPath});
  }
  return false;

}

export default useIsAuthenticated;
