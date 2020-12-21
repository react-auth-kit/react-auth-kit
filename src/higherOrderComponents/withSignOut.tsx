/**
  *@author Arkadip Bhattacharya <in2arkadipb13@gmail.com>
  *@fileoverview SignOut component
  *@copyright Arkadip Bhattacharya 2020
  *@license Apache-2.0
  */
import * as React from 'react';
import {AuthContextConsumer} from '../AuthProvider';

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
): React.FC<P> {
  return (props) => {
    return (
      <AuthContextConsumer>
        {(c) => {
          const signOut = () => {
            try {
              if (c?.authState.authToken) {
                c.setAuthState((prevState) => ({
                  ...prevState,
                  authToken: null,
                  authTokenType: null,
                  expireAt: null,
                  authState: null,
                  refreshToken: null,
                  refreshTokenExpireAt: null
                }));
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
/**
 * @exports withSignOut
 */
export default withSignOut;
