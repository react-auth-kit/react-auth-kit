/*
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

'use client';

import {AuthError} from '../errors';
import TokenObject from '../RxTokenObject';
import {createStoreParam, Store} from "./types";

/**
 *
 * authStore creates the default store for React Auth Kit.
 *
 * This store is like a Redux store, where every object and data is stored in.
 *
 * @typeParam T - Type of User State Object
 * @param params - Parameter to create a new store for auth kit
 * @returns Auth Kit Store
 *
 * @example
 * Here is an example on JavaScript
 * ```jsx
 * import authStore from 'react-auth-kit/authStore';
 *
 * const store = authStore({
 *  authName:'_auth',
 *  authType:'cookie',
 *  cookieDomain: window.location.hostname,
 *  cookieSecure: window.location.protocol === 'https:'
 * })
 * ```
 *
 * Here is an example on TypeScript
 * ```tsx
 * interface IUserData {
 *  name: string;
 *  uuid: string;
 * };
 *
 * const store = authStore<IUserData>({
 *  authName:'_auth',
 *  authType:'cookie',
 *  cookieDomain: window.location.hostname,
 *  cookieSecure: window.location.protocol === 'https:'
 * })
 * ```
 */
export default function authStore<T>(
    params: createStoreParam<T>,
): Store<T> {
  /**
   * If the type of the auth is cookie,
   * then a developer must provide the cookieDomain and cookieSecure params
   * for a solid use case.
   */
  if (
    params.authType === 'cookie' &&
    (
      params.cookieDomain === undefined ||
      params.cookieSecure === undefined
    )
  ) {
    throw new AuthError(
        'authType \'cookie\' requires \'cookieDomain\''+
      ' and \'cookieSecure\' to be present in the param',
    );
  }

  /**
   * If the refresh param is not undefined, then let's create the refresh auth
   */
  const refreshTokenName = params.refresh ? `${params.authName}_refresh` : null;

  /**
   * Instance the TokenObject with proper parameters
   */
  const tokenObject = new TokenObject<T>(
      params.authName,
      params.authType,
      refreshTokenName,
      params.debug === undefined ? false : params.debug,
      params.cookieDomain,
      params.cookieSecure,
  );

  return {
    tokenObject,
    refresh: params.refresh,
  };
}
