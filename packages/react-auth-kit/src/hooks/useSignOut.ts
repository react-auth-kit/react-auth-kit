'use client';

import {AuthError} from '../errors';
import {doSignOut} from '../utils/reducers';
import {useReactAuthKit, useReactAuthKitRouter} from '../AuthContext';

/**
 * Sign Out React Hook
 *
 * Call the hook to sign out and delete all the auth state
 *
 * This will remove the authState from memory and
 * also remove the stored data from cookie or localstorage
*
 * @returns React Hook with SignOut Functionality
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
 * For Now, this hook doesn't redirect automatically.
 * So one needs to write the redirect logic himself.
 *
 * ```js
 * const signOut = useSignOut()
 * signOut()
 * navigate("/login")
 * ```
 *
 * @throws AuthError
 * Thrown if the Hook is used outside the Provider Scope
 *
 */
function useSignOut(): (navigateTo?: string) => void {
  const context = useReactAuthKit();

  const router = useReactAuthKitRouter();
  const navigate = router ? router.useNavigate() : null;


  return (navigateTo?: string) => {
    context.set(doSignOut());
    if (navigateTo) {
      if (router && navigate) {
        navigate({to: navigateTo});
      } else {
        throw new
        AuthError(
            'Router Plugin is not implemented in the AuthProvider. Please'+
              ' use the router prop of AuthProvider and Router plugin to'+
              ' use this feture',
        );
      }
    }
  };
}

export default useSignOut;
