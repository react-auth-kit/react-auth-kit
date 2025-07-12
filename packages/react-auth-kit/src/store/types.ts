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

import type {createRefreshAttribute} from "../refresh";
import type {ITokenStore} from "./ITokenStore";

/**
 * Return type of authStore Function
 */
export interface Store<T> {
  /**
   * Instance of the token object
   */
  tokenStore: ITokenStore<T>;
  /**
   * Instance of the Refresh interface, if there is any.
   */
  refresh?: createRefreshAttribute<T>;
}

/**
 * Set State Data
 */
export interface UpdatedAuthKitState<T> {

  /**
   * Authentication Object
   */
  auth?: {

    /**
     * JWT access token
     */
    token: string,

    /**
     * Type of the access token
     *
     * @example
     * Bearer
     */
    type: string
  } | null,

  /**
   * Refresh JWT token
   */
  refresh?: string | null,

  /**
   * User state object
   */
  userState?: T
}
