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

import {IStorage} from "../../storage";
import LocalStorage from "../../storage/LocalStorage";
import {AuthKitStorageExpiredError, AuthKitStorageInvalidError} from "../../error";

describe('Local Storage', () => {
  const localStorageKey = 'testKey';
  const localStorageValue = 'testValue';

  const storage: IStorage = new LocalStorage();
  const date = new Date(Date.now() + 86400); // Set expiration to 1 day later

  beforeEach(() => {
    localStorage.clear();
  });

  it('Should set an item with prefix timestamp', () => {
    storage.set(localStorageKey, localStorageValue, date);
    expect(localStorage.getItem(localStorageKey)).toBe(`${date.getTime()}^&*&^${localStorageValue}`);
  });

  it('Should Return an item after set', () => {
    storage.set(localStorageKey, localStorageValue, date);
    expect(storage.get(localStorageKey)).toBe(localStorageValue);
  });

  it('should throw an error if not exist', () => {
    expect(() => storage.get('nonExistentKey')).toThrow(AuthKitStorageInvalidError);
  });

  it('Should remove an item', () => {
    storage.set(localStorageKey, localStorageValue, date);
    storage.remove(localStorageKey);
    expect(() => storage.get(localStorageKey)).toThrow(AuthKitStorageInvalidError);
  });

  it('should throw error if the key expired', () => {
    jest.useFakeTimers();
    storage.set(localStorageKey, localStorageValue, date);
    expect(storage.get(localStorageKey)).toBe(localStorageValue);

    jest.advanceTimersByTime(86400001); // Advance time by 1 day
    expect(() => storage.get(localStorageKey)).toThrow(AuthKitStorageExpiredError);
  });

  it('should throw error if existing value is corrupted', () => {
    localStorage.setItem(localStorageKey, 'corruptedValue');
    expect(() => storage.get(localStorageKey)).toThrow(AuthKitStorageInvalidError);
  });
});
