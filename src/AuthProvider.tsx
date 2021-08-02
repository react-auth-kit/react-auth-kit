import * as React from 'react';
import AuthContext from './AuthContext';
import TokenObject from './TokenObject';
import {AuthProviderProps} from './types';
import {authReducer} from './utils/reducers';


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
          Error('authType \'cookie\' ' +
            'requires \'cookieDomain\' and \'cookieSecure\' ' +
            'props in AuthProvider');
        }
      }

      const refreshTokenName = refreshToken ? `${authName}_refresh` : undefined;

      const tokenObject = new TokenObject({
        authTimeStorageName: `${authName}_time`,
        authStorageType: authType,
        authStorageName: authName,
        refreshTokenName,
        cookieDomain,
        cookieSecure,
        stateStorageName: `${authName}_state`,
      });
      const [authState, dispatch] =
        React.useReducer(authReducer, tokenObject.initialToken());

      React.useEffect(() => {
        tokenObject.syncTokens(authState);
      }, [authState]);

      return (
        <AuthContext.Provider value={{authState, dispatch}}>
          {children}
        </AuthContext.Provider>
      );
    };

export default AuthProvider;
