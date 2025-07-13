'use client';

import {useReactAuthKitStore} from '../AuthContext';
import Action from "../utils/action";
import {useTryNavigateTo} from "../utils/hooks";

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
  const tryNavigateTo = useTryNavigateTo();

  /**
   * Sign out function
   * This function signs out the user by removing the authentication state
   * from the store and optionally navigates to a specified path.
   *
   */
  return () :void => {
    Action.doSignOut(store)
    tryNavigateTo(navigateTo);
  };
}

export default useSignOut;
