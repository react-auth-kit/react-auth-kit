import {createContext} from 'react';
import type { Context } from 'react';
import TokenObject from './RxTokenObject';

/**
 * @internal
 * 
 * React Context to globally hold the TokenObject instance in the application.
 * 
 * @returns React Context with Token Object inside
 */
function getContext<T>(): Context<TokenObject<T>> {
  const context = createContext<TokenObject<T>>(null as any);
  if (process.env.NODE_ENV !== 'production') {
    context.displayName = 'ReactAuthKit';
  }
  return context;
}

export const AuthKitContext = getContext();

export default AuthKitContext;
