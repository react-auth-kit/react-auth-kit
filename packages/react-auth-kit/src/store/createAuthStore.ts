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

import TokenStore from "./TokenStore";
import {Store} from "./types";
import {AuthKitConfigError} from "../error";
import {createRefreshAttribute} from "../refresh";
import {IStorage, cookieSameSite} from "../storage";
import CookieStorage from "../storage/CookieStorage";
import LocalStorage from "../storage/LocalStorage";
import DefaultStorageNamingStrategy from "../storage/DefaultStorageNamingStrategy";
import JwtToken from "../token/JwtToken";
import valueOrDefault from "../utils/valueOrDefault";

/**
 * Default Auth Types
 */
type defaultAuthTypes = 'localstorage' | 'cookie';

/**
 * Store Creation Param
 */
interface storeAttributes<T> {
  /**
   * The name of the cookie or local store object on which
   * the auth token is stored.
   *
   * This name will also be used as a prefix for all other cookies.
   */
  authName?: string;

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
   * Path of the cookie, for which the cookie is valid.
   *
   * Defaults to `/`
   *
   * Needed if you are using `cookie` as authType
   *
   * @see {@link https://github.com/js-cookie/js-cookie#path}
   */
  cookiePath?: string;

  /**
   * SameSite attribute for the cookie.
   *
   * Defaults to `none`
   *
   * Needed if you are using `cookie` as authType
   *
   * @see {@link https://github.com/js-cookie/js-cookie#samesite}
   */
  cookieSameSite?: cookieSameSite;

  /**
   * Refresh API. Created using the ` createRefresh ` function.
   */
  refresh?: createRefreshAttribute<T>;

  /**
   * If Debug or not. Use this to debug your auth flow
   */
  debug?: boolean;
}

/**
 * Creates a new Auth Store for React Auth Kit.
 * This store can be used to manage authentication tokens and user state.
 * It supports both cookie and local storage as the underlying storage mechanism.
 *
 * @typeParam T - Type of User State Object
 *
 * @param authType - Type of the auth store. Can be either `cookie` or `localstorage`.
 * @param authAttributes - Attributes for the auth store, such as `authName`, `cookieDomain`, `cookieSecure`, etc.
 *
 * @returns A Store object containing the `tokenObject` and optionally a `refresh` object.
 * @throws {AuthKitConfigError} If the `authType` is not supported or if required attributes are missing.
 *
 * @example
 * ```js
 * import createAuthStore from 'react-auth-kit/createAuthStore';
 * const store = createAuthStore('cookie', {
 *   authName: '_auth',
 *   cookieDomain: window.location.hostname,
 *   cookieSecure: window.location.protocol === 'https:',
 *   refresh: createRefresh({
 *    interval: 10,
 *    refreshApiCallback: async (param) => {
 *      ... // Your refresh logic here
 *    };
 *  }
 */
export default function createAuthStore<T>(
  authType: defaultAuthTypes,
  authAttributes: storeAttributes<T>,
): Store<T> {

  // Check if the authType is valid
  // If not, throw an error
  let storage: IStorage;
  if(authType === "cookie"){
    // Check if the cookie attributes are provided
    const cookieSecure = valueOrDefault(authAttributes.cookieSecure, window.location.protocol === 'https:');
    const cookieDomain = valueOrDefault(authAttributes.cookieDomain, window.location.hostname);
    const cookiePath = valueOrDefault(authAttributes.cookiePath, '/');
    const cookieSameSite = valueOrDefault(authAttributes.cookieSameSite, 'none');

    // Create a new CookieStorage instance with the provided attributes
    storage = new CookieStorage(cookieDomain, cookieSecure, cookiePath, cookieSameSite);
  }
  else if (authType === "localstorage"){
    // Create a new LocalStorage instance
    storage = new LocalStorage();
  }
  else {
    throw new AuthKitConfigError(
      `authType '${authType}' is not supported. Use 'cookie' or 'localstorage'`,
    );
  }

  /**
   * Instance the TokenStore with proper parameters
   */
  const tokenStore = new TokenStore<T>(
    !!authAttributes.refresh,
    storage,
    new DefaultStorageNamingStrategy(valueOrDefault(authAttributes.authName, '_auth')),
    new JwtToken(),
    valueOrDefault(authAttributes.debug, false),
  )

  return {
    tokenStore: tokenStore,
    refresh: authAttributes.refresh,
  };
}
