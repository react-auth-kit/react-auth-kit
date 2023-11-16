import {useContext} from 'react';
import AuthContext from '../AuthContext';
import {AuthError} from '../errors';
import {isAuthenticated} from '../utils/utils';

/**
 * Auth User Data React Hook
 *
 * Call the hook,
 * to get the authenticated user data into your React Component
 *
 * This uses the context data to determine get the user data
 *
 * @typeParam T - Type of User State Object
 *
 * @example
 * Here is the example for JavaScript
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
 * Here is the example for TypeScript
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
 *
 * @throws AuthError
 * Thrown if the Hook is used outside the Provider Scope.
 *
 * @returns React Hook with user state functionility.
 * If the user is authenticated, then user data is returned.
 * If the user is not authenticated, then `null` is ruturned.
 */
function useAuthUser<T>(): T | null {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new
    AuthError(
        'Auth Provider is missing. ' +
        'Make sure, you are using this hook inside the auth provider.',
    );
  }

  if (isAuthenticated(context.value)) {
    return context.value.userState as T;
  } else {
    // TODO: Need to signout and redirect to login
    return null;
  }
}

export default useAuthUser;
