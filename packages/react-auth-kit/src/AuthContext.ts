/**
 *
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Auth Store
 * @copyright Arkadip Bhattacharya 2020
 *
 */

import * as React from 'react';
import TokenObject from './RxTokenObject';

function getContext<T>(): React.Context<TokenObject<T>> {
  const context = React.createContext<TokenObject<T>>(null as any);
  if (process.env.NODE_ENV !== 'production') {
    context.displayName = 'ReactAuthKit';
  }
  return context;
}

export const AuthKitContext = getContext();

export default AuthKitContext;
