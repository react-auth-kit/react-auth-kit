/**
 * 
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Auth Store
 * @copyright Arkadip Bhattacharya 2020
 *
 */

import * as React from 'react';
import TokenObject from './RxTokenObject';

function getContext<T>(): React.Context<TokenObject<T>>{
    return React.createContext<TokenObject<T>>(null as any);
}

export const AuthKitContext = getContext();

export default AuthKitContext;
