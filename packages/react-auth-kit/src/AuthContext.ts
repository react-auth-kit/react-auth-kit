'use client';

import type {Context} from 'react';
import {createContext, useContext} from 'react';

import {IRouter} from "./route";
import type {ITokenStore} from "./store";
import {AuthKitProviderMissingError} from "./error";

interface ReactAuthKitContextConfig {
  fallbackPath?: string
}

interface ReactAuthKitContext<T> {
  store: ITokenStore<T>
  router?: IRouter
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

/**
 * @internal
 * @returns React Context with Token Object inside
 *
 * Use this context to globally hold the TokenObject instance in the application.
 *
 */
const AuthKitContext = getContext();

/**
 *
 * @internal
 * @returns TokenObject from the context
 *
 * React Context consumer to globally hold the
 * TokenObject instance in the application.
 */
export function useReactAuthKitStore(): ITokenStore<unknown> {
  const context = useContext(AuthKitContext);
  if (context === null) {
    throw new
    AuthKitProviderMissingError(
        'Auth Provider is missing. ' +
        'Make sure, you are using this component inside the auth provider.',
    );
  }
  return context.store;
}

/**
 *
 * @internal
 * @returns Router Object from the context
 *
 * React Context consumer to globally hold the
 * Router instance in the application.
 */
export function useReactAuthKitRouter(): IRouter|undefined {
  const context = useContext(AuthKitContext);
  if (context === null) {
    throw new
    AuthKitProviderMissingError(
        'Auth Provider is missing. ' +
        'Make sure, you are using this component inside the auth provider.',
    );
  }
  return context.router;
}

/**
 * @internal
 * @returns React Auth Kit configurations
 *
 * React Context consumer to globally hold the
 * React Auth Kit configurations in the application.
 */
export function useReactAuthKitConfig(): ReactAuthKitContextConfig {
  const context = useContext(AuthKitContext);
  if (context === null) {
    throw new
    AuthKitProviderMissingError(
        'Auth Provider is missing. ' +
        'Make sure, you are using this component inside the auth provider.',
    );
  }
  return context.config;
}

export default AuthKitContext;
