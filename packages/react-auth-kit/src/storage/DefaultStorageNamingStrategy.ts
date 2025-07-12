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

import {IStorageNamingStrategy} from "./IStorageNamingStrategy";

/**
 * DefaultStorageNamingStrategy is a class that implements the IStorageNamingStrategy interface.
 * It provides methods to generate storage names for authentication-related data,
 * using a specified prefix.
 */
export default class DefaultStorageNamingStrategy implements IStorageNamingStrategy {
  private readonly prefix: string;

  /**
   * Constructs a DefaultStorageNamingStrategy instance with a specified prefix.
   * @param prefix The prefix to use for generating storage names.
   */
  constructor(prefix: string) {
    this.prefix = prefix;
  }

  /**
   * Generates a storage name for the authentication token.
   * @returns The storage name for the authentication token.
   */
  getAuthStorageName(): string {
    return `${this.prefix}_auth`;
  }

  /**
   * Generates a storage name for the authentication type.
   * @returns The storage name for the authentication type.
   */
  getAuthTypeStorageName(): string {
    return `${this.prefix}_auth_type`;
  }

  /**
   * Generates a storage name for the access token.
   * @return The storage name for the access token.
   */
  getRefreshTokenStorageName(): string {
    return `${this.prefix}_refresh`;
  }

  /**
   * Generates a storage name for the state.
   * @returns The storage name for the state.
   */
  getStateStorageName(): string{
    return `${this.prefix}_state`;
  }

}
