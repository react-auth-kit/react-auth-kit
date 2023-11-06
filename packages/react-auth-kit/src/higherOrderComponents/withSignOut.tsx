/**
 * 
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Sign Out functionality <Higher Order Component>
 * @copyright Arkadip Bhattacharya 2020
 * 
 */

import * as React from 'react';
import AuthContext from '../AuthContext';
import {doSignOut} from '../utils/reducers';
import {AuthError} from '../errors';

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

  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new
    AuthError('Auth Provider is missing. ' +
      'Please add the AuthProvider before Router');
  }

  const signOut = ():boolean => {
    try {
      if (context) {
        context.set(doSignOut());
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  return (props) => {
    return (
      <Component {...props} signOut={signOut}/>
    );
  };
}

export default withSignOut;
