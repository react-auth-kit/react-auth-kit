'use client';

import {useReactAuthKitStore, useReactAuthKitRouter} from '../AuthContext';
import {AuthKitError} from "../error";
import Action from "../utils/action";

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
 * @throws AuthKitError
 * Thrown if the Hook is used outside the Provider Scope
 *
 */

/**
 * useSignOut React Hook
 *
 * This hook provides a function to sign out the user and optionally navigate to a specified path.
 * It removes the authentication state from the store and, if a router is configured,
 * navigates to the specified path.
 *
 * @param navigateTo - An optional string representing the path to navigate to after signing out.
 *
 * @returns A function that, when called, signs out the user and navigates to the specified path if provided.
 *
 * @example
 * Simple example:
 * ```js
 * import useSignOut from 'react-auth-kit/hooks/useSignOut'
 *
 * const SecureComponent = () => {
 *  const signOut = useSignOut();
 *  return (
 *    <button onClick={() => signOut()}>Sign Out!</button>
 *  )
 * }
 * ```
 *
 * @example
 * Example with navigation:
 * ```js
 * import useSignOut from 'react-auth-kit/hooks/useSignOut'
 *
 * const SecureComponent = () => {
 *  const signOut = useSignOut("/login"); // <-- Specify the path to navigate after signing out
 *  return (
 *    <button onClick={() => signOut()}>Sign Out and Redirect to Log in</button>
 *  )
 * };
 * ```
 */
function useSignOut(navigateTo?: string): (navigateTo?: string) => void {
  const store = useReactAuthKitStore();
  const router = useReactAuthKitRouter();

  const navigate = router ? router.useNavigate() : null;

  /**
   * Sign out function
   * This function signs out the user by removing the authentication state
   * from the store and optionally navigates to a specified path.
   *
   */
  return () :void => {
    Action.doSignOut(store)
    if (navigateTo) {
      if (router && navigate) {
        navigate({to: navigateTo});
      } else {
        throw new
        AuthKitError(
            'Router Plugin is not implemented in the AuthProvider. Please'+
              ' use the router prop of AuthProvider and Router plugin to'+
              ' use this feature',
        );
      }
    }
  };
}

export default useSignOut;
