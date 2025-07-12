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

import {IStorage} from "./IStorage";
import AuthKitStorageInvalidError from "../error/AuthKitStorageInvalidError";
import AuthKitStorageExpiredError from "../error/AuthKitStorageExpiredError";

/**
 * LocalStorage class implements the IStorage interface for managing key-value pairs in localStorage.
 * It supports setting values with an expiration date, retrieving values, and removing items.
 */
export default class LocalStorage implements IStorage {
  /**
   * Retrieves a value from localStorage.
   * @throws {AuthKitStorageError} If the key does not exist or has expired.
   * @param key The key of the item to retrieve.
   *
   * @return The value associated with the key.
   */
  public get(key: string): string | never {
    const value = localStorage.getItem(key);
    if (value === null) {
      throw new AuthKitStorageInvalidError(`Key "${key}" does not exist in localStorage.`);
    }

    const {expiresAt, actualValue} = this.extractExpiration(value);
    if (expiresAt < new Date()) {
      this.remove(key);
      throw new AuthKitStorageExpiredError(`Key "${key}" has expired.`);
    }

    return actualValue;
  }

  /**
   * Sets a value in localStorage with an expiration date.
   * @param key The key under which to store the value.
   * @param value The value to store.
   * @param expiresAt The date when the item should expire.
   *
   * @throws {AuthKitStorageError} If there is an error setting the value.
   */
  public set(key: string, value: string, expiresAt: Date): void | never {
    const updated_value = this.prependExpiration(value, expiresAt);
    localStorage.setItem(key, updated_value);
  }

  /**
   * Removes an item from localStorage.
   * @param key The key of the item to remove.
   *
   * @throws {AuthKitStorageError} If there is an error removing the item.
   */
  public remove(key: string): void | never {
    localStorage.removeItem(key);
  }

  /**
   * Prepends the expiration timestamp to the value.
   * @param value The value to store.
   * @param expiresAt The date when the item should expire.
   *
   * @return The value with the expiration timestamp prepended.
   */
  private prependExpiration(value: string, expiresAt: Date): string {
    const expirationTimestamp = expiresAt.getTime();
    return `${expirationTimestamp}^&*&^${value}`;
  }

  /**
   * Extracts the expiration timestamp and actual value from the stored string.
   * @param value The stored value containing the expiration timestamp and actual value.
   *
   * @return An object containing the expiration date and the actual value.
   * @throws {AuthKitStorageError} If the value format is invalid.
   */
  private extractExpiration(value: string): { expiresAt: Date, actualValue: string } {
    const [expirationTimestamp, actualValue] = value.split('^&*&^');
    if (!expirationTimestamp || !actualValue) {
      throw new AuthKitStorageInvalidError(`Invalid value format: ${value}`);
    }
    return {
      expiresAt: new Date(Number(expirationTimestamp)),
      actualValue
    };
  }
}
