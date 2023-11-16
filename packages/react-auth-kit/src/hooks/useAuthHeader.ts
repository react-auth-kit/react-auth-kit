import {useContext} from 'react';
import AuthContext from '../AuthContext';
import {AuthError} from '../errors';
import {isAuthenticated} from '../utils/utils';

/**
 * Auth Header React Hook
 *
 * Call the hook,
 * to get the auth header for network request
 *
 * **Format: `type token` (authType-space-authToken)**
 *
 * @example
 * Here is a simple example
 * ```jsx
 * import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
 *
 * const Component = () => {
 *  const authHeader = useAuthHeader();
 *  const headers = {
 *    'Authorization': authHeader
 *  }
 *  // use the headers in the network request
 *  ...
 * }
 * ```
 *
 * @throws AuthError
 * Thrown if the Hook is used outside the Provider Scope.
 *
 * @returns If the user is authenticated,
 * then `'auth.type auth.token'` is returned.
 * If the user is not authenticated, then `null` is ruturned.
 */
function useAuthHeader(): string | null {
  const c = useContext(AuthContext);
  if (c === null) {
    throw new
    AuthError(
        'Auth Provider is missing. ' +
        'Make sure, you are using this hook inside the auth provider.',
    );
  }

  const {value} = c;

  if (!!value.auth && isAuthenticated(value)) {
    return `${value.auth.type} ${value.auth.token}`;
  } else {
    return null;
  }
}

export default useAuthHeader;
