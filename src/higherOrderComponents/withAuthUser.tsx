/**
  *@author Arkadip Bhattacharya <in2arkadipb13@gmail.com>
  *@fileoverview Authentication User
  *@copyright Arkadip Bhattacharya 2020
  *@license Apache-2.0
  */
import * as React from 'react';
import {AuthContextConsumer} from '../AuthContext';
import {AuthStateUserObject} from '../types';

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
): React.FC<P> {
  return (props: P)=>{
    return (
      <AuthContextConsumer>
        {(context) => {
          if (context === null) {
            throw new
            Error('Auth Provider is missing. ' +
              'Please add the AuthProvider before Router');
          }
          return (
            <Component {...props} authState={context?.authState.authState}/>
          );
        }}
      </AuthContextConsumer>
    );
  };
}
/**
 * @exports withAuthUser
 */
export default withAuthUser;
