'use client';

import {useReactAuthKit} from '../AuthContext';
import useIsAuthenticated from './useIsAuthenticated';

/**
 * Auth User Data React Hook
 *
 * Call the hook,
 * to get the authenticated user data into your React Component
 *
 * This uses the context data to determine the user data
 *
 * @typeParam T - Type of User State Object
 *
 * @returns React Hook with user state functionality.
 * If the user is authenticated, then user data is returned.
 * If the user is not authenticated, then `null` is returned.
 *
 * @throws AuthError
 * Thrown if the Hook is used outside the Provider Scope.
 *
 * @example
 * Here is the example of JavaScript
 * ```js
 * import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
 *
 * const Component = () => {
 *  const authUser = useAuthUser()
 *  const name = authUser.name;
 *  const uuid = authUser.uuid;
 *  ...
 * }
 * ```
 * Here is the example of TypeScript
 * ```tsx
 * import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
 *
 * interface IUserData {
 *  name: string;
 *  uuid: string;
 * };
 *
 * const Component = () => {
 *  const authUser = useAuthUser<IUserData>()
 *  const name = authUser.name;
 *  const uuid = authUser.uuid;
 *  ...
 * }
 * ```
 */
function useAuthUser<T>(): () => T | null {
  const {value} = useReactAuthKit();
  const isAuthenticated = useIsAuthenticated();

  return () => {
    if (isAuthenticated()) {
      return value.userState as T;
    } else {
      return null;
    }
  };
}

export default useAuthUser;
