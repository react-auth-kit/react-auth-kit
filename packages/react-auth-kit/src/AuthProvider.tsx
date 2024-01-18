'use client';

import * as React from 'react';
import AuthKitContext from './AuthContext';
import type {createStoreReturn} from './createStore';
import {useInterval} from './utils/hooks';
import {doRefresh, doSignOut} from './utils/reducers';

/**
 * Props of the AuthProvider Component
 */
interface AuthProviderProps<T> {
  /**
   * Auth Kit Store.
   *
   * Create the store using the `createStore` function
   */
  store: createStoreReturn<T>

  /**
   * React Component.
   * Effectively your entine application
   */
  children: React.ReactNode
}

/**
 *
 * React Provider that includes React Auth Kit functionality in your React
 * Application.
 *
 * @returns React Functional component with React Auth Kit Recharged.
 *
 * @remarks
 * Make sure you wrap your application as well as your
 * router components in AuthProvider.
 *
 * AuthProvider should be your Topmost element so that it can work effectively
 * throughout the application.
 *
 * @example
 * ```jsx
 * const store = createStore()
 *
 * <AuthProvider store={store}>
 *  <RoutesComponent/>
 * </AuthProvider>
 * ```
 *
 */
function AuthProvider<T extends object>(
    {
      store,
      children,
    }: AuthProviderProps<T>,
): ReturnType<React.FC> {
  const {tokenObject, refresh} = store;

  if (refresh) {
    useInterval(
        () => {
          refresh
              .refreshApiCallback({
                authToken: tokenObject.value.auth?.token,
                authUserState: tokenObject.value.userState,
                refreshToken: tokenObject.value.refresh?.token,
              })
              .then((result) => {
                // IF the API call is successful then refresh the AUTH state
                if (result.isSuccess) {
                  // store the new value using the state update
                  tokenObject.set(doRefresh(result));
                } else {
                  // signout if failed to refresh
                  tokenObject.set(doSignOut());
                }
              })
              .catch(() => {
                // Retry for Future
              });
        },
      tokenObject.value.isSignIn ? refresh.interval : null,
    );
  }

  return (
    // @ts-expect-error 'AnyAction' is assignable to the constraint of type 'T'
    // , but 'T' could be instantiated with a different subtype
    <AuthKitContext.Provider value={tokenObject}>
      {children}
    </AuthKitContext.Provider>
  );
}

export default AuthProvider;
