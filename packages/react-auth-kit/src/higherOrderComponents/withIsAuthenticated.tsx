/**
 * 
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Authentication Status <Higher Order Component>
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
    isAuth: boolean
}

/**
 * @public
 * @function
 * @name withIsAuthenticated
 * @description Inject Authentication status inside the Component's Prop
 * @param Component
 */
function withIsAuthenticated<P extends withAuthHeaderProps>(
    Component: React.ComponentType<P>,
): React.FunctionComponent<P> {

  const c = React.useContext(AuthContext);
  if (c === null) {
    throw new
    AuthError('Auth Provider is missing. ' +
      'Please add the AuthProvider before Router');
  }

  return (props) => {
    if ( isAuthenticated(c.value)) {
      return <Component {...props} isAuth={true}/>;
    } else {
      return <Component {...props} isAuth={false}/>;
    }
  };
}

export default withIsAuthenticated;
