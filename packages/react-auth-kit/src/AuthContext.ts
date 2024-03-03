'use client';

import {createContext, useContext} from 'react';
import type {Context} from 'react';
import TokenObject from './RxTokenObject';

/**
 * @internal
 * @returns React Context with Token Object inside
 *
 * React Context to globally hold the TokenObject instance in the application.
 *
 */
function getContext<T>(): Context<TokenObject<T>> {
  const context = createContext<TokenObject<T>>(null as any);
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
  return useContext(AuthKitContext);
}

export default AuthKitContext;
