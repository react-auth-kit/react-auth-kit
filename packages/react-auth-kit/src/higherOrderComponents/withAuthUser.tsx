/**
 *
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Authentication User <Higher Order Component>
 * @copyright Arkadip Bhattacharya 2020
 *
 */

import * as React from 'react';
import AuthContext from '../AuthContext';
import {AuthError} from '../errors';
import {isAuthenticated} from '../utils/utils';

/**
 * @interface withAuthProps
 */
interface withAuthStateProps<T> {
    authState: T | null
}

/**
 * @function
 * @name withAuthUser
 * @description Inject Authenticated User's state inside the Component's Prop
 * @param Component
 */
function withAuthUser<T, P extends withAuthStateProps<T>>(
    Component: React.ComponentType<P>,
): React.FunctionComponent<P> {
  const c = React.useContext(AuthContext);
  if (c === null) {
    throw new
    AuthError(
        'Auth Provider is missing. ' +
        'Make sure, you are using this component inside the auth provider.',
    );
  }

  return (props: P)=>{
    if (isAuthenticated(c.value)) {
      return (
        <Component {...props} authState={c.value.userState}/>
      );
    } else {
      return (
        <Component {...props} authState={null}/>
      );
    }
  };
}
/**
 * @exports withAuthUser
 */
export default withAuthUser;
