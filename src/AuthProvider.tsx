import * as React from 'react';
import TokenObject from './TokenObject';
import {AuthContextInterface, AuthProviderProps, TokenInterface} from './types';

const AuthContext = React.createContext<AuthContextInterface>({
  authState: {
    authTokenType: null,
    authState: null,
    authToken: null,
    refreshToken: null,
    expireAt: null,
  },
  setAuthState: () => {},
});

/**
 * AuthProvider - The Authentication Context Provider
 *
 * @param children
 * @param authStorageName
 * @param authStorageType
 * @param authTimeStorageName
 * @param cookieDomain
 * @param refreshTokenName
 * @param cookieSecure
 * @param stateStorageName
 *
 * @return Functional Component
 */
const AuthProvider: React.FunctionComponent<AuthProviderProps> =
    ({
      children,
      authStorageType,
      authStorageName,
      authTimeStorageName,
      stateStorageName,
      refreshTokenName,
      cookieDomain,
      cookieSecure,
    }) => {
      if (authStorageType === 'cookie') {
        if (!cookieDomain) {
          throw new
          Error('authStorageType \'cookie\' ' +
            'requires \'cookieDomain\' and \'cookieSecure\' in AuthProvider');
        }
      }

      const tokenObject = new TokenObject({
        authTimeStorageName,
        authStorageType,
        authStorageName,
        refreshTokenName,
        cookieDomain,
        cookieSecure,
        stateStorageName,
      });
      const [authState, setAuthState] = React.useState<TokenInterface>(
          tokenObject.initialToken(),
      );

      React.useEffect(() => {
        tokenObject.syncTokens(authState);
      }, [authState]);

      return (
        <AuthContext.Provider value={{authState, setAuthState}}>
          {children}
        </AuthContext.Provider>
      );
    };

AuthProvider.defaultProps = {
  authStorageType: 'cookie',
  authStorageName: '_auth_token',
  authTimeStorageName: '_auth_time',
  stateStorageName: '_auth_state',
  cookieSecure: true,
};


export default AuthProvider;
const AuthContextConsumer = AuthContext.Consumer;
export {AuthContext, AuthContextConsumer};
