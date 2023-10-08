/**
 * 
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Auth Context
 * @copyright Arkadip Bhattacharya 2020
 *
 */

import * as React from 'react';
import {AuthContextInterface} from './types';

const AuthContext = React.createContext<AuthContextInterface | null>(null);

const AuthContextConsumer = AuthContext.Consumer;
export {AuthContextConsumer};
export default AuthContext;
