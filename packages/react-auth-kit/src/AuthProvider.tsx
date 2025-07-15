'use client';

import * as React from 'react';

import type {IRouter} from "./route";
import type {Store} from "./store";

import {Refresh} from './refresh';
import AuthKitContext from './AuthContext';

/**
 * Props of the AuthProvider Component
 */
interface AuthProviderProps<T> {
  /**
   * Auth Kit Store.
   *
   * Create the store using the `authStore` function
   */
  store: Store<T>

  /**
   * Auth Kit Router.
   *
   * Internally used to redirect after sign-in and token expiration
   */
  router?: IRouter

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
 * import AuthProvider from 'react-auth-kit/AuthProvider'
 * import {createAuthStore} from 'react-auth-kit/store'
 * import ReactRouterPlugin from '@auth-kit/react-router/route'
 *
 * const store = createAuthStore()
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
  const { tokenStore, refresh } = store;

  return (
    <AuthKitContext.Provider
      // @ts-expect-error 'TokenObject' is assignable to the constraint
      // of type 'T', but 'T' could be instantiated with a different subtype
      value={{ store: tokenStore, router, config: { fallbackPath } }}
    >
      {refresh ?
        (
          <Refresh refresh={refresh} store={tokenStore}>
            {children}
          </Refresh>
        ) :
        children
      }
    </AuthKitContext.Provider>
  );
}

export default AuthProvider;
