/**
 *
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Authentication header <Higher Order Component>
 * @copyright Arkadip Bhattacharya 2020
 *
 */

import * as React from 'react';
import AuthContext from '../AuthContext';
import {AuthError} from '../errors';
import {isAuthenticated} from '../utils/utils';

/**
 * @interface withAuthHeaderProps
 */
interface withAuthHeaderProps {
    authHeader: string
}

/**
 * @public
 * @function
 * @name withAuthHeader
 * @description Inject Authentication Header inside the Component's Prop
 * @param Component - React Component
 */
function withAuthHeader<P extends withAuthHeaderProps>(
    Component: React.ComponentType<P>,
):React.FunctionComponent<P> {
  const c = React.useContext(AuthContext);
  if (c === null) {
    throw new
    AuthError('Auth Provider is missing. ' +
      'Please add the AuthProvider before Router');
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
