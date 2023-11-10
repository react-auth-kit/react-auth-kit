/**
 * 
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Auth Context Provider
 * @copyright Arkadip Bhattacharya 2020
 *
 */


import * as React from 'react';
import AuthKitContext from './AuthContext';
import TokenObject from './RxTokenObject';
import { AuthError } from './errors';
import type { createRefreshParamInterface } from './types';

// const ContextKey = Symbol.for(`react-redux-context`)
// const gT: {[ContextKey]?: Map<typeof React.createContext, Context<ReactReduxContextValue>>} = 
// (typeof globalThis !== "undefined" ? globalThis : /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */ {}) as any; 

interface AuthProviderProps {
  authType: 'cookie' | 'localstorage'
  authName: string,
  refresh?: createRefreshParamInterface
  cookieDomain?: string
  cookieSecure?: boolean
  children: React.ReactNode
}

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
function AuthProvider<T extends object>(
  {
    children,
    authType,
    authName,
    cookieDomain,
    cookieSecure,
    refresh
  }: AuthProviderProps
): ReturnType<React.FC> {
  if (authType === 'cookie') {
    if (!cookieDomain) {
      throw new
        AuthError('authType \'cookie\' ' +
          'requires \'cookieDomain\' and \'cookieSecure\' ' +
          'props in AuthProvider');
    }
  }

  const refreshTokenName = refresh ? `${authName}_refresh` : null;

  const tokenObject = new TokenObject<T>(
    authName,
    authType,
    refreshTokenName,
    cookieDomain,
    cookieSecure
  );

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
