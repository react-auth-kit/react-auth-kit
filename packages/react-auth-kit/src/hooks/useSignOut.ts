import {useContext} from 'react';

import AuthContext from '../AuthContext';
import {AuthError} from '../errors';
import {doSignOut} from '../utils/reducers';

/**
 * Sign Out React Hook
 *
 * Call the hook,
 * when you want to sign out and delete all the auth state
 *
 * This will remove the authState from memory and
 * also remove the stored data from cookie or localstorage
 *
 * @example
 * Here's a simple example:
 * ```js
 * import useSignOut from 'react-auth-kit/hooks/useSignOut'
 *
 * const SecureComponent = () => {
 *   const signOut = useSignOut()
 *   return (
 *     <button onClick={() => signOut()}>Sign Out!</button>
 *   )
 * }
 * ```
 * @remarks
 * For Now, this hook doesn't redirects automatically.
 * So one need to writw the redirect logic himself.
 *
 * ```js
 * const signOut = useSignOut()
 * signOut()
 * navigate('/login')
 * ```
 *
 * @throws AuthError
 * Thrown if the Hook is used outside the Provider Scope
 *
 * @returns React Hook with SignOut Functionility
 */
function useSignOut(): () => (boolean) {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new
    AuthError(
        'Auth Provider is missing. ' +
        'Make sure, you are using this hook inside the auth provider.',
    );
  }

  return () => {
    try {
      if (context) {
        context.set(doSignOut());
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };
}

export default useSignOut;
