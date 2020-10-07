/**
  *@author Arkadip Bhattacharya <in2arkadipb13@gmail.com>
  *@fileoverview Authentication header
  *@copyright Arkadip Bhattacharya 2020
  *@license Apache-2.0
  */

import * as React from 'react';
import {AuthContextConsumer} from '../AuthProvider';

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
):React.FC<P> {
  return (props) => {
    return (
      <AuthContextConsumer>
        {(c) => {
          if (c?.authState) {
            return (
              <Component
                {...props}
                authHeader={
                  `${c.authState.authTokenType} ${c.authState.authToken}`
                }
              />
            );
          } else {
            return <Component {...props} authHeader={null}/>;
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
