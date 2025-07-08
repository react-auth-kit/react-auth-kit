'use client';

import * as React from 'react';

import type Router from './route';
import type { Store } from './createStore';

import Refresh from './Refresh';
import AuthKitContext from './AuthContext';

/**
 * Props of the AuthProvider Component
 */
interface AuthProviderProps<T> {
  /**
   * Auth Kit Store.
   *
   * Create the store using the `createStore` function
   */
  store: Store<T>

  /**
   * Auth Kit Router.
   *
   * Internally used to redirect after sign-in and token expiration
   */
  router?: Router

  /**
   * Fallback Path
   * The path to redirect if signed out
   */
  fallbackPath?: string

  /**
   * React Component.
   * Effectively your entire application
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
 * import ReactRouterPlugin from '@auth-kit/react-router/route'
 *
 * const store = createStore()
 *
 * <AuthProvider store={store} router={ReactRouterPlugin} fallbackPath="/login">
 *  <RoutesComponent/>
 * </AuthProvider>
 * ```
 *
 */
function AuthProvider<T>(
  {
    store,
    router,
    fallbackPath,
    children,
  }: AuthProviderProps<T>,
): ReturnType<React.FC> {
  const { tokenObject, refresh } = store;

  return (
    <AuthKitContext.Provider
      // @ts-expect-error 'TokenObject' is assignable to the constraint
      // of type 'T', but 'T' could be instantiated with a different subtype
      value={{ token: tokenObject, router, config: { fallbackPath } }}
    >
      {refresh ?
        (
          <Refresh refresh={refresh} store={tokenObject}>
            {children}
          </Refresh>
        ) :
        children
      }
    </AuthKitContext.Provider>
  );
}

export default AuthProvider;
