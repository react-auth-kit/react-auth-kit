import * as React from 'react';
import {useReactAuthKit} from '../AuthContext';
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
  authHeader: string | null
}

/**
 * @deprecated Higher-order components are not commonly used in
 * modern React code, use Hooks instead
 *
 * React {@link https://legacy.reactjs.org/docs/higher-order-components.html | HCO} that injects the auth header into
 * the class-based component props
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
 * @param Component - React Class based Component
 * @returns React Higher Order Component with injected `authHeader` proe
 */
function withAuthHeader<P extends withAuthHeaderProps>(
    Component: React.ComponentType<P>,
):React.FunctionComponent<P> {
  const {value} = useReactAuthKit();

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
      return <Component {...props} authHeader={null}/>;
    }
  };
}

export default withAuthHeader;
