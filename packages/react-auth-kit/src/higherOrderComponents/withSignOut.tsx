import * as React from 'react';
import AuthContext from '../AuthContext';
import {doSignOut} from '../utils/reducers';
import {AuthError} from '../errors';

/**
 * Type of the React props, that are injected to the component
 */
interface withSignOutProps {
  /**
   * Sign Out Function.
   * Call this to signout the user
   */
  signOut(): boolean
}

/**
 * @deprecated Higher-order components are not commonly used in
 * modern React code, use Hooks instead
 *
 * React {@link https://legacy.reactjs.org/docs/higher-order-components.html | HOC} that injects
 * the `signOut` function into the class-based component props.
 *
 * Call the `signOut` function in the prop
 * to sign out and delete all the auth state
 *
 * This will remove the authState from memory and
 * also remove the stored data from cookie or localstorage
 *
 * @example
 * Here's a simple example:
 * ```js
 * class MyComponent extends React.Component {
 *  this.props.signOut();
 *  ...
 * }
 * export default withSignOut(MyComponent);
 * ```
 * @remarks
 * For Now, this hook doesn't redirects automatically.
 * So one need to writw the redirect logic himself.
 *
 *
 * @param Component - React Class based Component
 * @returns React Higher Order Component with injected `signOut` prop
 */
function withSignOut<P extends withSignOutProps>(
    Component: React.ComponentType<P>,
): React.FunctionComponent<P> {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new
    AuthError(
        'Auth Provider is missing. ' +
        'Make sure, you are using this component inside the auth provider.',
    );
  }

  const signOut = ():boolean => {
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

  return (props) => {
    return (
      <Component {...props} signOut={signOut}/>
    );
  };
}

export default withSignOut;
