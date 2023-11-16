import * as React from 'react';
import AuthContext from '../AuthContext';
import {AuthError} from '../errors';
import {isAuthenticated} from '../utils/utils';

/**
 * Type of the properties, that are injected to the component
 */
interface withAuthHeaderProps {
  /**
   * The string which contains the auth header for the network requests
   *
   * Format: `type token`
   */
  authHeader: string
}

/**
 * @deprecated
 *
 * React {@link https://legacy.reactjs.org/docs/higher-order-components.html | HOC} that injects the auth header into
 * the class based component props
 *
 * **Format: `type token` (authType-space-authToken)**
 *
 * @example
 * ```tsx
 * class MyComponent extends React.Component {
 *  render() {
 *    return <h1>Hello, {this.props.authHeader}</h1>;
 *  }
 * }
 * export default withAuthHeader(MyComponent);
 * ```
 *
 * @throws AuthError
 * Thrown if the Hook is used outside the Provider Scope.
 *
 * @param Component - React Class based Component with injected `authHeader`
 * @returns React Higher Order Component with injected `authHeader` proe
 */
function withAuthHeader<P extends withAuthHeaderProps>(
    Component: React.ComponentType<P>,
):React.FunctionComponent<P> {
  const c = React.useContext(AuthContext);
  if (c === null) {
    throw new
    AuthError(
        'Auth Provider is missing. ' +
        'Make sure, you are using this component inside the auth provider.',
    );
  }

  const {value} = c;

  return (props) => {
    if (!!value.auth && isAuthenticated(value)) {
      return (
        <Component
          {...props}
          authHeader={
            `${value.auth.type} ${value.auth.token}`
          }
        />
      );
    } else {
      return <Component {...props} authHeader={``}/>;
    }
  };
}
/**
  *@exports withAuthHeader
  */
export default withAuthHeader;
