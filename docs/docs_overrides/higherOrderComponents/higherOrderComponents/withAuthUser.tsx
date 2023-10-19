/**
 * 
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Authentication User <Higher Order Component>
 * @copyright Arkadip Bhattacharya 2020
 * 
 */

import * as React from 'react';
import {AuthContextConsumer} from '../AuthContext';
import {AuthStateUserObject} from '../types';
import {AuthKitError} from '../errors';
import {isAuthenticated} from '../utils/utils';

/**
 * @interface withAuthProps
 */
interface withAuthProps {
    authState: AuthStateUserObject| null
}

/**
 * @function
 * @name withAuthUser
 * @description Inject Authenticated User's state inside the Component's Prop
 * @param Component
 */
function withAuthUser<P extends withAuthProps>(
    Component: React.ComponentType<P>,
): React.FunctionComponent<P> {
  return (props: P)=>{
    return (
      <AuthContextConsumer>
        {(context) => {
          if (context === null) {
            throw new
            AuthKitError('Auth Provider is missing. ' +
              'Please add the AuthProvider before Router');
          }
          if (context.authState.auth && isAuthenticated(context.authState)) {
            return (
              <Component {...props} authState={context.authState.userState}/>
            );
          } else {
            return (
              <Component {...props} authState={null}/>
            );
          }
        }}
      </AuthContextConsumer>
    );
  };
}
/**
 * @exports withAuthUser
 */
export default withAuthUser;
