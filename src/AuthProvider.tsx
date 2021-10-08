import * as React from 'react';
import AuthContext from './AuthContext';
import TokenObject from './TokenObject';
import {AuthProviderProps} from './types';
import {authReducer, doRefresh} from './utils/reducers';
import {useInterval} from './utils/hooks';


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
    cookieDomain,
    cookieSecure,
    refresh,
  }) => {
    if (authType === 'cookie') {
      if (!cookieDomain) {
        throw new
        Error('authType \'cookie\' ' +
          'requires \'cookieDomain\' and \'cookieSecure\' ' +
          'props in AuthProvider');
      }
    }

    const refreshTokenName = refresh ? `${authName}_refresh` : null;

    const tokenObject = new TokenObject(authName, authType,
        refreshTokenName, cookieDomain, cookieSecure);

    const [authState, dispatch] =
      React.useReducer(authReducer, tokenObject.initialToken());

    if (refresh) {
      useInterval(
          ()=>{
            const r = refresh.refreshApiCallback(
                {
                  authToken: authState.auth?.token,
                  authTokenExpireAt: authState.auth?.expiresAt,
                  authUserState: authState.userState,
                  refreshToken: authState.refresh?.token,
                  refreshTokenExpiresAt: authState.refresh?.expiresAt,
                });
            // store the new value using the state update
            if (r.isSuccess) {
            // IF the API call is successful then refresh the AUTH state
              dispatch(doRefresh(r));
            }
          },
        authState.isSignIn ? refresh.interval : null,
      );
    }

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
