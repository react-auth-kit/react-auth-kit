/*
 * Copyright 2025 Arkadip Bhattacharya
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

import Cookies from "js-cookie";
import {IStorage} from "./IStorage";
import AuthKitStorageInvalidError from "../error/AuthKitStorageInvalidError";

/**
 * Type definition for the possible values of the SameSite attribute for cookies.
 * It can be "strict", "lax", or "none" (case-insensitive).
 */
type cookieSameSite = "strict" | "Strict" | "lax" | "Lax" | "none" | "None";

/**
 * CookieStorage is a class that implements the IStorage interface for managing
 * authentication tokens in cookies. It provides methods to get, set, and remove
 * items from cookie storage.
 */
export default class CookieStorage implements IStorage {
  private cookie: Cookies.CookiesStatic;

  /**
   * Constructs a CookieStorage instance with specified cookie attributes.
   * @param cookieDomain The domain for the cookie.
   * @param cookieSecure Whether the cookie should be secure (HTTPS only).
   * @param cookiePath The path for the cookie, defaults to '/'.
   * @param cookieSameSite The SameSite attribute for the cookie, defaults to "lax".
   */
  constructor(cookieDomain: string, cookieSecure: boolean, cookiePath: string = '/', cookieSameSite: cookieSameSite = "lax") {
    this.cookie = Cookies.withAttributes({
      domain: cookieDomain,
      secure: cookieSecure,
      sameSite: cookieSameSite,
      path: cookiePath
    })
  }

  /**
   * Retrieves a value from the cookie storage.
   * @param key The key of the item to retrieve.
   * @returns The value associated with the key.
   * @throws {AuthKitStorageInvalidError} If the key does not exist in cookie storage.
   */
  get (key: string): string | never {
    const value = this.cookie.get(key);
    if (value === undefined) {
      throw new AuthKitStorageInvalidError(`Key "${key}" does not exist in cookie storage.`);
    }
    return value;
  }

  /**
   * Sets a value in the cookie storage with an expiration date.
   * @param key The key under which to store the value.
   * @param value The value to store.
   * @param expiresAt The date when the item should expire.
   * @throws {AuthKitStorageInvalidError} If there is an error setting the value.
   */
  set(key: string, value: string, expiresAt: Date): void {
    this.cookie.set(key, value, {
      expires: expiresAt,
    });
  }

  /**
   * Removes an item from the cookie storage.
   * @param key The key of the item to remove.
   * @throws {AuthKitStorageInvalidError} If there is an error removing the item.
   */
  remove (key: string): void {
    this.cookie.remove(key);
  }
}
