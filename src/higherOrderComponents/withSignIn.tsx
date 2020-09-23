import * as React from 'react';
import {AuthContextConsumer} from '../AuthProvider';
import {signInFunctionParams} from '../types';

interface withSignInProps {
    signIn(params: signInFunctionParams): boolean
}

function withSignIn<P extends withSignInProps>(Component: React.ComponentType<P>):React.FC<P> {
  return (props) => {
    return (
      <AuthContextConsumer>
        {(c) => {
          const signIn = (signInConfig: signInFunctionParams): boolean => {
            const {token, tokenType, authState, expiresIn} = signInConfig;
            const expTime = new Date(new Date().getTime() + expiresIn * 60 * 1000);
            try {
              if (c) {
                c.setAuthState((prevState) => ({
                  ...prevState,
                  authToken: token,
                  authTokenType: tokenType,
                  expireAt: expTime,
                  authState: authState,
                }));
                return true;
              } else {
                return false;
              }
            } catch (e) {
              console.error(e);
              return false;
            }
          };
          return <Component {...props} signIn={signIn}/>;
        }}
      </AuthContextConsumer>
    );
  };
}

export default withSignIn;
