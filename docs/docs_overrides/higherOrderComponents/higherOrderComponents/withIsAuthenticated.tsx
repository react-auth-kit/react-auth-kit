/**
 * 
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Authentication Status <Higher Order Component>
 * @copyright Arkadip Bhattacharya 2020
 * 
 */

import * as React from 'react';
import {AuthContextConsumer} from '../AuthContext';
import {AuthKitError} from '../errors';
import {isAuthenticated} from '../utils/utils';

/**
 * @interface withAuthHeaderProps
 */
interface withAuthHeaderProps {
    isAuth: string
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
  return (props) => {
    return (
      <AuthContextConsumer>
        {(c) => {
          if (c === null) {
            throw new
            AuthKitError('Auth Provider is missing. ' +
              'Please add the AuthProvider before Router');
          }
          if (c.authState.auth && isAuthenticated(c.authState)) {
            return <Component {...props} isAuth={true}/>;
          } else {
            return <Component {...props} isAuth={false}/>;
          }
        }}
      </AuthContextConsumer>
    );
  };
}

export default withIsAuthenticated;
