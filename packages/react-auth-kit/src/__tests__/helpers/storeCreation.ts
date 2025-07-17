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

import TokenStore from "../../store/TokenStore";
import CookieStorage from "../../storage/CookieStorage";
import DefaultStorageNamingStrategy from "../../storage/DefaultStorageNamingStrategy";
import JwtToken from "../../token/JwtToken";
import {ITokenStore} from "../../store";
import LocalStorage from "../../storage/LocalStorage";

function createCookieTokenStore<T>(authPrefix: string, isUsingRefreshToken: boolean = false): ITokenStore<T> {
  return new TokenStore<T>(
    isUsingRefreshToken,
    new CookieStorage(window.location.hostname, window.location.protocol === 'https:'),
    new DefaultStorageNamingStrategy(authPrefix),
    new JwtToken(),
    false
  );
}

function createLocalStorageTokenStore<T>(authPrefix: string, isUsingRefreshToken: boolean = false): ITokenStore<T> {
  return new TokenStore<T>(
    isUsingRefreshToken,
    new LocalStorage(),
    new DefaultStorageNamingStrategy(authPrefix),
    new JwtToken(),
    false
  );
}

test("Just a test case", ()=>{
  expect(true).toBeTruthy();
})

export {createCookieTokenStore, createLocalStorageTokenStore};
