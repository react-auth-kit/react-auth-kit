/**
  *@author Arkadip Bhattacharya <in2arkadipb13@gmail.com>
  *@fileoverview Authentication status
  *@copyright Arkadip Bhattacharya 2020
  *@license Apache-2.0
  */

import * as React from 'react';
import {AuthContextConsumer} from '../AuthProvider';

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
): React.FC<P> {
  return (props) => {
    return (
      <AuthContextConsumer>
        {(c) => {
          if (c?.authState.authToken && c?.authState.expireAt) {
            if (new Date(c.authState.expireAt) > new Date()) {
              return <Component {...props} isAuth={true}/>;
            } else {
              c.setAuthState({
                authToken: null,
                authTokenType: null,
                expireAt: null,
                authState: null,
                refreshToken: null,
                refreshTokenExpireAt: null
              });
              return <Component {...props} isAuth={false}/>;
            }
          } else {
            return <Component {...props} isAuth={false}/>;
          }
        }}
      </AuthContextConsumer>
    );
  };
}

/**
 * @exports withIsAuthenticated
 */
export default withIsAuthenticated;
