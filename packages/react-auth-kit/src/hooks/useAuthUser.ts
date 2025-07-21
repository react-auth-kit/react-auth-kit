'use client';

import {useReactAuthKitStore} from '../AuthContext';
import useIsAuthenticated from './useIsAuthenticated';


/**
 * useAuthUser React Hook
 *
 * This hook retrieves the authenticated user's data from the context.
 * If the user is authenticated, it returns the user state; otherwise, it returns null.
 *
 * @typeParam T - Type of the user state object.
 *
 * @returns A function that returns the user state if authenticated; otherwise, it signs out the user and redirects
 * to a fallback path if configured.
 *
 * @example
 * JavaScript Example:
 * ```js
 * import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
 *
 * const Component = () => {
 *  const authUser = useAuthUser();
 *  const data = authUser();
 *
 *  console.log(data.name); // Access username
 *  console.log(data.uuid); // Access user UUID
 * }
 * ```
 *
 * @example
 * TypeScript Example:
 * ```tsx
 * import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
 * interface IUserData {
 *  name: string;
 *  uuid: string;
 * };
 *
 * const Component = () => {
 *  const authUser = useAuthUser<IUserData>();
 *  const data = authUser();
 *
 *  console.log(data.name); // Access username
 *  console.log(data.uuid); // Access user UUID
 * }
 * ```
 */
function useAuthUser<T>(): () => T | null {
  const {value} = useReactAuthKitStore();
  const isAuthenticated = useIsAuthenticated();

  return () => {
    return isAuthenticated() ?
      value.userState as T :
      null;
  };
}

export default useAuthUser;
