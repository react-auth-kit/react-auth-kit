import {useContext} from 'react';
import AuthContext from '../AuthContext';
import {signInFunctionParams} from '../types';
import {doSignIn} from '../utils/reducers';
import {AuthError} from '../errors';

/**
 * Sign In React Hook
 *
 * Call the hook,
 * when you want to sign In and authenticate the user
 *
 * This will authenticate the user by writing the uer state into the mamory
 * Also, this will call the rx engine to store the auth into into the storage
 *
 * @typeParam T - Type of User State Object
 * 
 * @example
 * Here's a an example without refresh token:
 * ```js
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
 * Here's a an example with refresh token:
 * ```js
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
 * @remarks
 * If you are using refresh token, make sure you add that in the parameter,
 * else it throws AuthError
 *
 * If you are not using refresh token, make sure you don't include
 * that in the parameter, else it throws AuthError.
 *
 * @throws AuthError
 * Thrown if the Hook is used outside the Provider Scope.
 *
 * Thrown if refresh token is added, in spite not used.
 *
 * Thrown if refresh token is not added, is spite used.
 *
 * @returns React Hook with SignIn Functionility
 */
function useSignIn<T>(): (signInConfig: signInFunctionParams<T>) => boolean {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new
    AuthError(
      'Auth Provider is missing. ' +
      'Make sure, you are using this hook inside the auth provider.'
    );
  }
  return (signInConfig: signInFunctionParams<T>): boolean => {
    if (context.value.isUsingRefreshToken) {
      // Using the power of refresh token
      if (signInConfig.refresh) {
        // refresh token params are provided
        // sign in with refresh token
        context.set(doSignIn(signInConfig));
        return true;
      } else {
        // refresh token params are not provided
        // throw an error
        throw new AuthError(
            'This appication is using refresh token feature.'+
          ' So please include `refresh` param in the parameters',
        );
      }
    } else {
      // Not using refresh token
      if (signInConfig.refresh) {
        // params are not expected but provided
        // throw an error
        throw new Error(
            'This appication is not using refresh token feature.'+
          ' So please remove the `refresh` param in the parameters.'+
          ' In Case you want to use refresh token feature,'+
          ' make sure you added that while creating the store.',
        );
      } else {
        // sign in without the refresh token
        context.set(doSignIn(signInConfig));
        return true;
      }
    }
  };
}

export default useSignIn;
