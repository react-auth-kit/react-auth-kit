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

import CookieStorage from "../../storage/CookieStorage";
import {AuthKitStorageInvalidError} from "../../error";

describe('Cookie Storage', () => {
  const storage = new CookieStorage(window.location.hostname, window.location.protocol === 'https:');
  it('should throw an error when trying to get a non-existent key', () => {
    expect(() => storage.get('nonExistentKey')).toThrow(AuthKitStorageInvalidError);
  });

  it('should set and get a value correctly', () => {
    storage.set('testKey', 'testValue', new Date(Date.now() + 86400)); // Set with the end of 1 day
    expect(storage.get('testKey')).toBe('testValue');
  });

  it('should remove a key correctly', () => {
    storage.set('testKey', 'testValue', new Date(Date.now() + 86400));
    storage.remove('testKey');
    expect(() => storage.get('testKey')).toThrow(AuthKitStorageInvalidError);
  });
});
