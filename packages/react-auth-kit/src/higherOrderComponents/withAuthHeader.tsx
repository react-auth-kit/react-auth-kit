/**
 * 
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Authentication header <Higher Order Component>
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
            return (
              <Component
                {...props}
                authHeader={
                  `${c.authState.auth.type} ${c.authState.auth.token}`
                }
              />
            );
          } else {
            return <Component {...props} authHeader={``}/>;
          }
        }}
      </AuthContextConsumer>
    );
  };
}
/**
  *@exports withAuthHeader
  */
export default withAuthHeader;
