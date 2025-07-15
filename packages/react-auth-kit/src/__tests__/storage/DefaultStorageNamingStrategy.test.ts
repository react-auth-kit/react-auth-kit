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

import DefaultStorageNamingStrategy from "../../storage/DefaultStorageNamingStrategy";
import {IStorageNamingStrategy} from "../../storage";

test('DefaultStorageNamingStrategy', () => {
  const strategy: IStorageNamingStrategy = new DefaultStorageNamingStrategy('auth');

  expect(strategy.getAuthStorageName()).toBe('auth_auth');
  expect(strategy.getAuthTypeStorageName()).toBe('auth_auth_type');
  expect(strategy.getStateStorageName()).toBe('auth_state');
  expect(strategy.getRefreshTokenStorageName()).toBe('auth_refresh');
});
