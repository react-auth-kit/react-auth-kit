import * as React from 'react';
import TokenObject from './TokenObject';
import {AuthContextInterface, AuthProviderProps, TokenInterface} from './types';

const AuthContext = React.createContext<AuthContextInterface>({
  authState: {
    authTokenType: null,
    authState: null,
    authToken: null,
    isUsingRefreshToken: false,
    refreshToken: null,
    refreshTokenExpireAt: null,
    expireAt: null,
  },
  setAuthState: () => {},
});

/**
 * AuthProvider - The Authentication Context Provider
 *
 * @param children
 * @param authStorageName
 * @param cookieDomain
 * @param cookieSecure
 *
 * @return Functional Component
 */
const AuthProvider: React.FunctionComponent<AuthProviderProps> =
    ({
      children,
      authType,
      authName,
      refreshToken,
      cookieDomain,
      cookieSecure,
    }) => {
      if (authType === 'cookie') {
        if (!cookieDomain) {
          throw new
          Error('authStorageType \'cookie\' ' +
            'requires \'cookieDomain\' and \'cookieSecure\' in AuthProvider');
        }
      }

      const refreshTokenName = refreshToken ? `${authName}_refresh` : undefined

      const tokenObject = new TokenObject({
        authTimeStorageName: `${authName}_time`,
        authStorageType: authType,
        authStorageName: authName,
        refreshTokenName,
        cookieDomain,
        cookieSecure,
        stateStorageName: `${authName}_state`,
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
  authType: 'cookie',
  authName: '_auth',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:"
};


export default AuthProvider;
const AuthContextConsumer = AuthContext.Consumer;
export {AuthContext, AuthContextConsumer};
