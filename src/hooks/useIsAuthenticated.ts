/**
 * @author Arkadip Bhattacharya <in2arkadipb13@gmail.com>
 * @fileoverview Authentication status <hook>
 * @copyright Arkadip Bhattacharya 2020
 *
 * Copyright 2020 Arkadip Bhattacharya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from 'react';
import AuthContext from '../AuthContext';
import {doSignOut} from '../utils/reducers';

/**
  *@function
  *@name useIsAuthenticated
  *@description check weather user is authenticated or not
  */
function useIsAuthenticated(): ()=>boolean {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new
    Error('Auth Provider is missing. ' +
      'Please add the AuthProvider before Router');
  }
  return () => {
    if (context.authState.auth) {
      if (new Date(context.authState.auth.expiresAt) > new Date()) {
        return true;
      } else {
        context.dispatch(doSignOut());
        return false;
      }
    } else {
      return false;
    }
  };
}
/**
  *@exports useIsAuthenticated
  */
export default useIsAuthenticated;
