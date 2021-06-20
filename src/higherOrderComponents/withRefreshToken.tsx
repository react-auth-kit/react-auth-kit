/**
 *@author Arkadip Bhattacharya <in2arkadipb13@gmail.com>
 *@fileoverview Authentication header
 *@copyright Arkadip Bhattacharya 2020
 *@license Apache-2.0
 */

import * as React from 'react';
import {AuthContextConsumer} from '../AuthContext';
import RefreshToken from '../RefreshToken';

/**
 * @interface withRefreshTokenProps
 */
interface withRefreshTokenProps {
  refreshToken: RefreshToken
}

/**
 * @public
 * @function
 * @name withAuthHeader
 * @description Inject Authentication Header inside the Component's Prop
 * @param Component - React Component
 */
function withRefreshToken<P extends withRefreshTokenProps>(
    Component: React.ComponentType<P>,
): React.FC<P> {
  return (props) => {
    return (
      <AuthContextConsumer>
        {(c) => {
          if (c === null) {
            throw new
            Error('Auth Provider is missing. ' +
              'Please add the AuthProvider before Router');
          }
          return (
            <Component
              {...props}
              refreshToken={
                new RefreshToken(c)
              }
            />
          );
        }}
      </AuthContextConsumer>
    );
  }
  ;
}
/**
*@exports withRefreshToken
*/
export default withRefreshToken;
