/*
 * Copyright  $year Arkadip Bhattacharya
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

import TokenObject from "../RxTokenObject";
import type {createRefreshParamInterface} from "../createRefresh";

/**
 * Return type of authStore Function
 */
export interface Store<T> {
  /**
   * Instance of the token object
   */
  tokenObject: TokenObject<T>;
  /**
   * Instance of the Refresh interface, if there is any.
   */
  refresh?: createRefreshParamInterface<T>;
}

/**
 * Store Creation Param
 */
export interface createStoreParam<T> {
  /**
   * The name of the cookie or local store object on which
   * the auth token is stored.
   *
   * This name will also be used as a prefix for all other cookies.
   */
  authName: string;
  /**
   * Type of the Storage.
   *
   * - `cookie` - Store all the auth information in the cookie
   * - `localstorage` - Store all the auth information in the localstorage
   */
  authType: 'cookie' | 'localstorage';
  /**
   * Domain of the cookie, for which the cookie is valid.
   *
   * Needed if you are using `cookie` as authType
   *
   * @see {@link https://github.com/js-cookie/js-cookie#domain}
   */
  cookieDomain?: string;
  /**
   * Indicating if the cookie transmission requires a secure protocol (https).
   *
   * Needed if you are using `cookie` as authType
   *
   * @see {@link https://github.com/js-cookie/js-cookie#secure}
   */
  cookieSecure?: boolean;
  /**
   * Refresh API. Created using the ` createRefresh ` function.
   */
  refresh?: createRefreshParamInterface<T>;

  /**
   * If Debug or not. Use this to debug your auth flow
   */
  debug?: boolean;
}
