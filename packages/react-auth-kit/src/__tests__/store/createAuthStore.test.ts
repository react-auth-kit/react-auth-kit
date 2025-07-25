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

import createAuthStore from '../../store';
import {AuthKitConfigError, AuthKitError} from "../../error";

import createRefresh, {createRefreshAttribute} from '../../refresh/createRefresh';
import {createCookieTokenStore, createLocalStorageTokenStore} from "../helpers/storeCreation";

describe('Store without refresh token', ()=>{
  it('Store creation local store', ()=> {
    const store = createAuthStore("localstorage", {
      authName: '__',
    });
    const tokenObject = createLocalStorageTokenStore("__");
    expect(store.refresh).toBeUndefined();
    expect(store.tokenStore.value).toEqual(tokenObject.value);
  });

  it('Store creation cookie', ()=> {
    const store = () => createAuthStore("cookie",{
      authName: '__',
      cookieDomain: window.location.hostname,
      cookieSecure: false,
    });
    const tokenObject = createCookieTokenStore("__");
    expect(store).not.toThrow(AuthKitError);
    expect(store().refresh).toBeUndefined();
    expect(store().tokenStore.value).toEqual(tokenObject.value);
  });
});

describe('Store with refresh token', ()=>{
  let refresh: createRefreshAttribute<object>;
  beforeAll(()=>{
    refresh = createRefresh({
      interval: 10,
      refreshApiCallback: async (param) => {
        return {
          isSuccess: true,
          newAuthToken: param.authToken || 'Hello',
        };
      },
    });
  });

  it('Store creation local store', ()=> {
    const store = createAuthStore("localstorage", {
      authName: '__auth',
      refresh: refresh,
      debug: false,
    });
    const tokenObject = createLocalStorageTokenStore("__auth", true);

    expect(store.refresh).toEqual(refresh);
    expect(store.tokenStore.value).toEqual(tokenObject.value);
  });

  it('Store creation cookie', ()=> {
    const store = () => createAuthStore("cookie", {
      authName: '__auth',
      cookieDomain: window.location.hostname,
      cookieSecure: false,
      refresh: refresh,
    });
    const tokenObject = createCookieTokenStore("__auth", true);

    expect(store).not.toThrow(AuthKitError);
    expect(store().refresh).toEqual(refresh);
    expect(store().tokenStore.value).toEqual(tokenObject.value);
  });
});

test("Store creation with invalid storage type", () => {
  // @ts-ignore
  expect(() => createAuthStore("localstorage_", {
    authName: '__',
  })).toThrow(AuthKitConfigError);
})
