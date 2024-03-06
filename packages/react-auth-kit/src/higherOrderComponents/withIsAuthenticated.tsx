import * as React from 'react';
import {useReactAuthKit} from '../AuthContext';
import {isAuthenticated} from '../utils/utils';

/**
 * Type of the React props, that are injected to the component
 */
interface withAuthHeaderProps {
  /**
   * A boolean value indicating if the user is authenticated or not
   */
  isAuth: boolean
}

/**
 * @deprecated Higher-order components are not commonly used in
 * modern React code, use Hooks instead
 *
 * React {@link https://legacy.reactjs.org/docs/higher-order-components.html | HOC} that injects
 * the authentication state into the class-based component props
 *
 * @example
 * ```jsx
 * class MyComponent extends React.Component {
 *  render() {
 *    return <h1>Hello, {this.props.isAuth}</h1>;
 *  }
 * }
 * export default withIsAuthenticated(MyComponent);
 * ```
 *
 * @throws AuthError
 * Thrown if the Hook is used outside the Provider Scope.
 *
 * @param Component - React class-based Component
 * @returns React Higher Order Component with injected `isAuth` prop
 */
function withIsAuthenticated<P extends withAuthHeaderProps>(
    Component: React.ComponentType<P>,
): React.FunctionComponent<P> {
  const {value} = useReactAuthKit();

  return (props) => {
    if ( isAuthenticated(value)) {
      return <Component {...props} isAuth={true}/>;
    } else {
      return <Component {...props} isAuth={false}/>;
    }
  };
}

export default withIsAuthenticated;
