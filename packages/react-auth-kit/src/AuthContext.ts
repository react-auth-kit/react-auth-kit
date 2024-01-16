"use client"

import {createContext, useContext} from 'react';
import type {Context} from 'react';
import TokenObject from './RxTokenObject';
import { AuthError } from './errors';

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

export function useReactAuthKitContext(): TokenObject<unknown>{
  const context = useContext(AuthKitContext);
  if (context === null) {
    throw new
    AuthError(
        'Auth Provider is missing. ' +
        'Make sure, you are using this component inside the auth provider.',
    );
  }
  return context;
}

export default AuthKitContext;
