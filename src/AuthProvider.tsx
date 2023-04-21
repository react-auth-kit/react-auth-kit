import * as React from 'react';
import AuthContext from './AuthContext';
import TokenObject from './TokenObject';
import {AuthProviderProps} from './types';
import {authReducer, doRefresh, doSignOut} from './utils/reducers';
import {useInterval} from './utils/hooks';
import {AuthKitError} from './errors';


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
        AuthKitError('authType \'cookie\' ' +
          'requires \'cookieDomain\' and \'cookieSecure\' ' +
          'props in AuthProvider');
      }
    }

    const refreshTokenName = refresh ? `${authName}_refresh` : null;

    const tokenObject = new TokenObject(authName, authType,
        refreshTokenName, cookieDomain, cookieSecure);

    const [authState, dispatch] =
      React.useReducer(authReducer, tokenObject.initialToken());

    const signOut = React.useCallback(() => {
      dispatch(doSignOut());
      // perform any other necessary state updates here
    }, [dispatch]);

    if (refresh) {
      useInterval(
          () => {
            refresh
                .refreshApiCallback({
                  authToken: authState.auth?.token,
                  authTokenExpireAt: authState.auth?.expiresAt,
                  authUserState: authState.userState,
                  refreshToken: authState.refresh?.token,
                  refreshTokenExpiresAt: authState.refresh?.expiresAt,
                })
                .then((result) => {
                // IF the API call is successful then refresh the AUTH state
                  if (result.isSuccess) {
                  // store the new value using the state update
                    dispatch(doRefresh(result));
                  } else {
                  // do something in future
                  }
                })
                .catch(()=>{
                // do something in future
                });
          },
        authState.isSignIn ? refresh.interval : null,
      );
    }

    React.useEffect(() => {
      tokenObject.syncTokens(authState);
    }, [authState]);

    return (
      <AuthContext.Provider value={{authState, dispatch, signOut}}>
        {children}
      </AuthContext.Provider>
    );
  };

// Default prop for AuthProvider
AuthProvider.defaultProps = {
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
};

export default React.memo(AuthProvider);
