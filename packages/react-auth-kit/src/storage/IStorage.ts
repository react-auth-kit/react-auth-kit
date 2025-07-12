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


export interface IStorage {
  /**
   * Retrieves a value from the storage.
   * @param key The key of the item to retrieve.
   *
   * @returns The value associated with the key, or throws an error if the key does not exist.
   * @throws {AuthKitStorageError} If the key does not exist in the storage.
   */
  get: (key: string) => string | never;

  /**
   * Sets a value in the storage with an expiration date.
   * @param key The key under which to store the value.
   * @param value The value to store.
   * @param expiresAt The date when the item should expire.
   *
   * @returns
   * @throws {AuthKitStorageError} If there is an error setting the value.
   */
  set: (key: string, value: string, expiresAt: Date) => void | never;

  /**
   * Removes an item from the storage.
   *
   * @param key The key of the item to remove.
   *
   * @returns
   * @throws {AuthKitStorageError} If there is an error removing the item.
   */
  remove: (key: string) => void | never;
}
