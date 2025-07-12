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

export interface IStorageNamingStrategy {

  /**
   * Returns the name of the storage used for authentication.
   * @return  The name of the authentication storage.
   */
  getAuthStorageName: () => string;

  /**
   * Returns the name of the storage used for user state.
   * @return  The name of the user state storage.
   */
  getStateStorageName: () => string;

  /**
   * Returns the name of the storage used for authentication type.
   * @return  The name of the authentication type storage.
   */
  getAuthTypeStorageName: () => string;

  /**
   * Returns the name of the storage used for refresh tokens.
   * @return  The name of the refresh token storage.
   */
  getRefreshTokenStorageName: () => string;
}
