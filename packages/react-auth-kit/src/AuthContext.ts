'use client';

import {createContext, useContext} from 'react';
import type {Context} from 'react';
import TokenObject from './RxTokenObject';
import {AuthError} from './errors';
import Router from './route';

interface ReactAuthKitContext<T> {
  token: TokenObject<T>
  router?: Router
}

/**
 * @internal
 * @returns React Context with Token Object inside
 *
 * React Context to globally hold the TokenObject instance in the application.
 *
 */
function getContext<T>(): Context<ReactAuthKitContext<T>> {
  const context = createContext<ReactAuthKitContext<T>>(null as any);
  if (process.env.NODE_ENV !== 'production') {
    context.displayName = 'ReactAuthKit';
  }
  return context;
}

const AuthKitContext = getContext();

/**
 *
 * @internal
 * @returns TokenObject from the context
 *
 * React Context consumer to globally hold the
 * TokenObject instance in the application.
 *
 */
export function useReactAuthKit(): TokenObject<unknown> {
  const context = useContext(AuthKitContext);
  if (context === null) {
    throw new
    AuthError(
        'Auth Provider is missing. ' +
        'Make sure, you are using this component inside the auth provider.',
    );
  }
  return context.token;
}

export function useReactAuthKitRouter(): Router|undefined {
  const context = useContext(AuthKitContext);
  if (context === null) {
    throw new
    AuthError(
        'Auth Provider is missing. ' +
        'Make sure, you are using this component inside the auth provider.',
    );
  }
  return context.router;
}

export default AuthKitContext;
