import * as React from 'react';
import {useReactAuthKit} from '../AuthContext';
import {isAuthenticated} from '../utils/utils';

/**
 * Type of the React props, that are injected to the component
 *
 * @typeParam T - Type of User State Object
 */
interface withAuthStateProps<T> {
  /**
   * State of the user provided on signin or refresh
   *
   * If the type is null then user may be not authenticated.
   * Use `isAuthenticated` to verify
   */
  authState: T | null
}

/**
 * @deprecated Higher-order components are not commonly used in
 * modern React code, use Hooks instead
 *
 * React {@link https://legacy.reactjs.org/docs/higher-order-components.html | HOC} that injects the user state into
 * the class-based component props
 *
 * If the prop is null then the user may be not authenticated.
 * Use `isAuthenticated` to verify
 *
 * @example
 * ```jsx
 * class MyComponent extends React.Component {
 *  render() {
 *    return <h1>Hello, {this.props.authState}</h1>;
 *  }
 * }
 * export default withAuthUser(MyComponent);
 * ```
 *
 * @throws AuthError
 * Thrown if the Hook is used outside the Provider Scope.
 *
 * @param Component - React Class based Component
 * @returns React Higher Order Component with injected `authState` prop
 */
function withAuthUser<T, P extends withAuthStateProps<T>>(
    Component: React.ComponentType<P>,
): React.FunctionComponent<P> {
  const {value} = useReactAuthKit();

  return (props: P)=>{
    if (isAuthenticated(value)) {
      return (
        <Component {...props} authState={value.userState}/>
      );
    } else {
      return (
        <Component {...props} authState={null}/>
      );
    }
  };
}

export default withAuthUser;
