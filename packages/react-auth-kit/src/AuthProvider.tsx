/**
 * 
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Auth Context Provider
 * @copyright Arkadip Bhattacharya 2020
 *
 */


import * as React from 'react';
import AuthKitContext from './AuthContext';
import type { createStoreReturn } from './createStore';
import { useInterval } from './utils/hooks';
import { doRefresh } from './utils/reducers';

/**
 * Props of the AuthProvider Component
 */
interface AuthProviderProps<T> {
  /**
   * Auth Kit Store
   */
  store: createStoreReturn<T>
  
  /**
   * React Component
   * Effectively your entine application
   */
  children: React.ReactNode
}

/**
 * 
 * @param param0 
 * @returns 
 */
function AuthProvider<T extends object>(
  {
    store,
    children,
  }: AuthProviderProps<T>
): ReturnType<React.FC> {

  const { tokenObject, refresh } = store;

  if (!!refresh) {
    useInterval(
      () => {
        refresh
          .refreshApiCallback({
            authToken: tokenObject.value.auth?.token,
            authUserState: tokenObject.value.userState,
            refreshToken: tokenObject.value.refresh?.token
          })
          .then((result) => {
            // IF the API call is successful then refresh the AUTH state
            if (result.isSuccess) {
              // store the new value using the state update
              tokenObject.set(doRefresh(result));
            }
            else {
              // do something in future
            }
          })
          .catch(() => {
            // do something in future
          });
      },
      tokenObject.value.isSignIn ? refresh.interval : null,
    );
  }

  return (
    // @ts-ignore 'AnyAction' is assignable to the constraint of type 'T', but 'T' could be instantiated with a different subtype
    <AuthKitContext.Provider value={tokenObject}>
      {children}
    </AuthKitContext.Provider>
  );
}

// Default prop for AuthProvider
AuthProvider.defaultProps = {
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
};

export default AuthProvider;
