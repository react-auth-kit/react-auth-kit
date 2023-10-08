/**
 * 
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Sign Out functionality <Higher Order Component>
 * @copyright Arkadip Bhattacharya 2020
 * 
 */

import * as React from 'react';
import {AuthContextConsumer} from '../AuthContext';
import {doSignOut} from '../utils/reducers';
import {AuthKitError} from '../errors';

/**
 * @interface withSignOutProps
 */
interface withSignOutProps {
    signOut(): boolean
}

/**
 * @public
 * @function
 * @name withSignOut
 * @description Inject sign Out functionality inside the Component's Prop
 * @param Component
 */
function withSignOut<P extends withSignOutProps>(
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
          const signOut = () => {
            try {
              if (c) {
                c.dispatch(doSignOut());
                return true;
              } else {
                return false;
              }
            } catch (e) {
              return false;
            }
          };
          return <Component {...props} signOut={signOut}/>;
        }}
      </AuthContextConsumer>
    );
  };
}

export default withSignOut;
