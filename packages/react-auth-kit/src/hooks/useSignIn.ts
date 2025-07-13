'use client';

import type {signInFunctionParams} from '../types';
import {useReactAuthKitStore} from '../AuthContext';
import {AuthKitError} from "../error";
import Action from "../utils/action";
import {useTryNavigateTo} from "../utils/hooks";

/**
 * Sign In React Hook
 *
 * Call the hook to sign In and authenticate the user
 *
 * This will authenticate the user by writing the user state into the memory.
 * Also, this will call the RX engine to store the auth in the storage
 *
 * @typeParam T - Type of User State Object
 * @returns React Hook with SignIn Functionality
 *
 * @throws AuthKitError
 * - Thrown if the Hook is used outside the Provider Scope.
 * - Thrown if the refresh token is added, in spite not used.
 * - Thrown if the refresh token is not added, is spite used.
 *
 * @example
 * Here's an example without the refresh token:
 * ```jsx
 * import useSignIn from 'react-auth-kit/hooks/useSignIn'
 *
 * const LoginComponent = () => {
 *  const signIn = useSignIn()
 *  signIn({
 *    auth: {
 *      token: '<jwt token>'
 *    },
 *    userState: {name: 'React User', uid: 123456}
 *  })
 * }
 * ```
 *
 * Here's an example with a refresh token:
 * ```jsx
 * import useSignIn from 'react-auth-kit/hooks/useSignIn'
 *
 * const LoginComponent = () => {
 *  const signIn = useSignIn()
 *  signIn({
 *    auth: {
 *      token: '<jwt token>'
 *    },
 *    userState: {name: 'React User', uid: 123456},
 *    refresh: <refresh jwt token>
 *  })
 * }
 * ```
 *
 * Here's an example with a refresh token in TypeScript:
 * ```tsx
 * import useSignIn from 'react-auth-kit/hooks/useSignIn'
 *
 *  interface IUserData {
 *  name: string;
 *  uuid: string;
 * };
 *
 * const LoginComponent = () => {
 *  const signIn = useSignIn<IUserData>()
 *  signIn({
 *    auth: {
 *      token: '<jwt token>'
 *    },
 *    userState: {name: 'React User', uid: 123456},
 *    refresh: <refresh jwt token>
 *  })
 * }
 * ```
 *
 * @remarks
 * If you are using the refresh token, make sure you add that in the parameter,
 * else it throws AuthError
 *
 * If you are not using the refresh token, make sure you don't include
 * that in the parameter, else it throws AuthError.
 *
 */
function useSignIn<T>(): (signInConfig: signInFunctionParams<T>) => boolean | never {
  const context = useReactAuthKitStore();
  const navigateTo = useTryNavigateTo();

  /**
   *
   * ```js
   * {
   *  auth: {
   *    token: '<jwt token>'
   *  },
   *  userState: {name: 'React User', uid: 123456},
   *  refresh: <refresh jwt token>
   * }
   * ```
   * @param to - The path to redirect
   */
  return (signInConfig: signInFunctionParams<T>): boolean | never => {
    if (context.value.isUsingRefreshToken) {
      // Using the power of a refresh token
      if (signInConfig.refresh) {
        // refresh token params are provided
        // sign in with the refresh token
        Action.doSignIn(signInConfig, context);
        navigateTo(signInConfig.navigateTo);
        return true;
      } else {
        // refresh token params are not provided
        // throw an error
        throw new AuthKitError(
            'This application is using refresh token feature.'+
            ' So please include `refresh` param in the parameters',
        );
      }
    } else if (signInConfig.refresh) {
      // params are not expected but provided
      // throw an error
      throw new AuthKitError(
          'This application is not using refresh token feature.'+
          ' So please remove the `refresh` param in the parameters.'+
          ' In Case you want to use refresh token feature,'+
          ' make sure you added that while creating the store.',
      );
    } else {
      // sign in without the refresh token
      Action.doSignIn(signInConfig, context);
      navigateTo(signInConfig.navigateTo);
      return true;
    }
  };
}

export default useSignIn;
