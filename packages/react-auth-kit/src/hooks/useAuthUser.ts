'use client';

import {useReactAuthKitStore} from '../AuthContext';
import useIsAuthenticated from './useIsAuthenticated';

/**
 * Auth User Data React Hook
 *
 * Call the hook
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

/**
 * useAuthUser React Hook
 *
 * This hook retrieves the authenticated user's data from the context.
 * If the user is authenticated, it returns the user state; otherwise, it returns null.
 *
 * @typeParam T - Type of the user state object.
 *
 * @return A function that returns the user state if authenticated; otherwise, it signs out the user and redirects
 * to a fallback path if configured.
 *
 * @example
 * JavaScript Example:
 * ```js
 * import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
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
 *  console.log(data.name); // Access username
 *  console.log(data.uuid); // Access user UUID
 * }
 * ```
 */
function useAuthUser<T>(): () => T {
  const {value} = useReactAuthKitStore();
  const isAuthenticated = useIsAuthenticated();

  return () => {
    isAuthenticated()
    return value.userState as T;
  };
}

export default useAuthUser;
