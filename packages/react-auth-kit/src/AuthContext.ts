'use client';

import type {Context} from 'react';
import {createContext, useContext} from 'react';

import type Router from './route';
import type TokenObject from './RxTokenObject';
import {BaseAuthKitError} from "./error/BaseAuthKitError";

interface ReactAuthKitContextConfig {
  fallbackPath?: string
}

interface ReactAuthKitContext<T> {
  token: TokenObject<T>
  router?: Router
  config: ReactAuthKitContextConfig
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
    BaseAuthKitError(
        'Auth Provider is missing. ' +
        'Make sure, you are using this component inside the auth provider.',
    );
  }
  return context.token;
}

/**
 *
 * @internal
 * @returns Router Object from the context
 *
 */
export function useReactAuthKitRouter(): Router|undefined {
  const context = useContext(AuthKitContext);
  if (context === null) {
    throw new
    BaseAuthKitError(
        'Auth Provider is missing. ' +
        'Make sure, you are using this component inside the auth provider.',
    );
  }
  return context.router;
}

/**
 * @internal
 * @returns React Auth Kit configurations
 */
export function useReactAuthKitConfig(): ReactAuthKitContextConfig {
  const context = useContext(AuthKitContext);
  if (context === null) {
    throw new
    BaseAuthKitError(
        'Auth Provider is missing. ' +
        'Make sure, you are using this component inside the auth provider.',
    );
  }
  return context.config;
}

export default AuthKitContext;
