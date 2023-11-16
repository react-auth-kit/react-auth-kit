import * as React from 'react';
import AuthContext from '../AuthContext';
import {signInFunctionParams} from '../types';
import {doSignIn} from '../utils/reducers';
import {AuthError} from '../errors';

/**
 * Type of the React props, that are injected to the component
 */
interface withSignInProps<T> {
  /**
   *
   * Sign in Function, that signs in the user
   *
   * @param signInConfig - @param signInConfig - Parameters to perform sign in
   * ```js
   * {
   *  auth: {
   *    token: '<jwt token>'
   *  },
   *  userState: {name: 'React User', uid: 123456},
   *  refresh: <refresh jwt token>
   * }
   * ```
   */
  signIn(signInConfig: signInFunctionParams<T>): boolean
}
/**
 * @deprecated Higher-order components are not commonly used in
 * modern React code, use Hooks instead
 *
 * React {@link https://legacy.reactjs.org/docs/higher-order-components.html | HOC} that injects
 * the `signIn` function into the class based component props.
 *
 * Call the `signIn` function in the prop
 * to sign In and authenticate the user
 *
 * This will authenticate the user by writing the uer state into the mamory
 * Also, this will call the rx engine to store the auth into into the storage
 *
 * @example
 * Here is an example without refresh token:
 * ```jsx
 * class MyComponent extends React.Component {
 *  this.props.signIn({
 *    auth: {
 *      token: '<jwt token>'
 *    },
 *    userState: {name: 'React User', uid: 123456}
 *  })
 * }
 * export default withSignIn(MyComponent);
 * ```
 *
 * Here is an example with refresh token:
 * ```jsx
 * class MyComponent extends React.Component {
 *  this.props.signIn({
 *    auth: {
 *      token: '<jwt token>'
 *    },
 *    userState: {name: 'React User', uid: 123456},
 *    refresh: <refresh jwt token>
 *  }),
 * }
 * export default withSignIn(MyComponent);
 * ```
 *
 * @typeParam T - Type of User State Object
 *
 * @param Component - React Class based Component
 * @returns React Higher Order Component with injected `signIn` prop
 */
function withSignIn<T, P extends withSignInProps<T>>(
    Component: React.ComponentType<P>,
):React.FunctionComponent<P> {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new
    AuthError(
        'Auth Provider is missing. ' +
        'Make sure, you are using this component inside the auth provider.',
    );
  }

  const signIn = (signInConfig: signInFunctionParams<T>): boolean => {
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
        throw new AuthError(
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

  return (props) => {
    return (
      <Component {...props} signIn={signIn}/>
    );
  };
}

export default withSignIn;
