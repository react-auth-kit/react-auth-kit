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

import Cookies from 'js-cookie';

import {createCookieTokenStore} from "../helpers/storeCreation";

describe('Initial Value [Without Refresh Token]', () => {
  it('No Existing cookie is there', () => {
    const subscriber = jest.fn();
    expect(subscriber.mock.calls).toHaveLength(0);

    const tokenObject = createCookieTokenStore("__");

    tokenObject.subscribe(subscriber);

    expect(tokenObject.value).toMatchObject(
        {
          'auth': null,
          'isSignIn': false,
          'isUsingRefreshToken': false,
          'refresh': null,
          'userState': null,
        },
    );
    expect(subscriber).toHaveBeenCalled();
    expect(subscriber.mock.calls).toHaveLength(1);
    expect(subscriber).toHaveBeenCalledWith(
        {
          'auth': null,
          'isSignIn': false,
          'isUsingRefreshToken': false,
          'refresh': null,
          'userState': null,
        },
    );
  });

  describe('Existing Cookies are there', () => {
    beforeEach(() => {
      Cookies.set('___auth_type', 'Bearer');
      Cookies.set('___state', '{}');
    });

    afterEach(() => {
      Cookies.remove('___auth');
      Cookies.remove('___auth_type');
      Cookies.remove('___state');
    });

    it('Existing Cookies are there', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
      '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
      '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
      Cookies.set('___auth', token);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      const tokenObject = createCookieTokenStore("__")

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': {
          'token': token,
          'type': 'Bearer',
          'expiresAt': new Date(8008605195 * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {},
      };

      expect(tokenObject.value).toMatchObject(resp);
      expect(subscriber).toHaveBeenCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Cookie is not a proper JWT', () => {
      const token = 'tampered_';
      Cookies.set('___auth', token);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(Cookies.get('___auth')).toBe(token);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');

      const tokenObject = createCookieTokenStore("__");

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);
      expect(Cookies.get('__')).toBeUndefined();
      expect(Cookies.get('___type')).toBeUndefined();
      expect(Cookies.get('___state')).toBeUndefined();

      expect(subscriber).toHaveBeenCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Cookie JWT has no iat param', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.Gfx6VO9tcxwk6xqx9yYzSfebfeakZp5JYIgP_edcw_A';
      Cookies.set('___auth', token);

      expect(Cookies.get('___auth')).toBe(token);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      const tokenObject = createCookieTokenStore("__");

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(Cookies.get('__')).toBeUndefined();
      expect(Cookies.get('___type')).toBeUndefined();
      expect(Cookies.get('___state')).toBeUndefined();

      expect(subscriber).toHaveBeenCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Cookie was expired', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo5NzE0OTc5OTV9.XJbNAE-aRz7tO7tSHiUlMGGuUrAELPPkNITKVlNZ8DA';
      Cookies.set('___auth', token);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      const tokenObject = createCookieTokenStore("__");

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(Cookies.get('___auth')).toBeUndefined();
      expect(Cookies.get('___auth_type')).toBeUndefined();
      expect(Cookies.get('___state')).toBeUndefined();

      expect(subscriber).toHaveBeenCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing User State is not Parsable', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
      '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw60'+
      '3AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
      Cookies.set('___auth', token);
      Cookies.set('___state', 'asdfslafdal');


      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      const tokenObject = createCookieTokenStore("__");

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);
      expect(subscriber).toHaveBeenCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });
  });
});

describe('Initial Value [With Refresh Token]', () => {
  it('No Existing cookie is there', () => {
    const subscriber = jest.fn();
    expect(subscriber.mock.calls).toHaveLength(0);

    const tokenObject = createCookieTokenStore("__", true);

    tokenObject.subscribe(subscriber);

    expect(tokenObject.value).toMatchObject(
        {
          'auth': null,
          'isSignIn': false,
          'isUsingRefreshToken': true,
          'refresh': null,
          'userState': null,
        },
    );
    expect(subscriber).toHaveBeenCalled();
    expect(subscriber.mock.calls).toHaveLength(1);
    expect(subscriber).toHaveBeenCalledWith(
        {
          'auth': null,
          'isSignIn': false,
          'isUsingRefreshToken': true, 'refresh': null, 'userState': null,
        },
    );
  });

  describe('Existing Cookies are there', () => {
    beforeEach(() => {
      Cookies.set('___auth_type', 'Bearer');
      Cookies.set('___state', '{}');
    });

    afterEach(() => {
      Cookies.remove('___auth');
      Cookies.remove('___auth_type');
      Cookies.remove('___state');
      Cookies.remove('___refresh');
    });

    it('Existing Cookies are there', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0N'+
      'TY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw603AjpA'+
      'qNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
      Cookies.set('___auth', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiO'+
      'iIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjIwODYzfQ.q'+
      'vc94iV3P4eJQ9Z_Pnjbz2yLs1jz-KGek3uD6kFndEE';
      Cookies.set('___refresh', refreshToken);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(Cookies.get('___auth')).toBe(token);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(refreshToken);

      const tokenObject = createCookieTokenStore("__", true);

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': {
          'token': token,
          'type': 'Bearer',
          'expiresAt': new Date(8008605195 * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': refreshToken,
          'expiresAt': new Date(8008620863 * 1000),
        },
        'userState': {},
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(Cookies.get('___auth')).toBe(token);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(refreshToken);

      expect(subscriber).toHaveBeenCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Cookie is not a proper JWT but Refresh'+
    ' Token is a proper JWT', () => {
      const token = 'tampered_';
      Cookies.set('___auth', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiO'+
      'iIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjIwODYzfQ.q'+
      'vc94iV3P4eJQ9Z_Pnjbz2yLs1jz-KGek3uD6kFndEE';
      Cookies.set('___refresh', refreshToken);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(Cookies.get('___auth')).toBe(token);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(refreshToken);


      const tokenObject = createCookieTokenStore("__", true);
      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': refreshToken,
          'expiresAt': new Date(8008620863 * 1000),
        },
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(Cookies.get('___auth')).toBeUndefined();
      expect(Cookies.get('___auth_type')).toBeUndefined();
      expect(Cookies.get('___state')).toBeUndefined();
      expect(Cookies.get('___refresh')).toBe(refreshToken);

      expect(subscriber).toHaveBeenCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Cookie JWT has no exp param but Refresh'+
    ' Token is a proper JWT', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0N'+
      'TY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.Gfx6VO9tcxwk6xqx9yYzSfebfeakZp5JYI'+
      'gP_edcw_A';
      Cookies.set('___auth', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiO'+
      'iIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjIwODYzfQ.q'+
      'vc94iV3P4eJQ9Z_Pnjbz2yLs1jz-KGek3uD6kFndEE';
      Cookies.set('___refresh', refreshToken);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(Cookies.get('___auth')).toBe(token);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(refreshToken);


      const tokenObject = createCookieTokenStore("__", true);

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': refreshToken,
          'expiresAt': new Date(8008620863 * 1000),
        },
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(Cookies.get('___auth')).toBeUndefined();
      expect(Cookies.get('___auth_type')).toBeUndefined();
      expect(Cookies.get('___state')).toBeUndefined();
      expect(Cookies.get('___refresh')).toBe(refreshToken);

      expect(subscriber).toHaveBeenCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Cookie and Refresh Cookies are not a proper JWT', () => {
      const token = 'tampered_';
      Cookies.set('___auth', token);

      const refreshToken = 'tempered__';
      Cookies.set('___refresh', refreshToken);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(Cookies.get('___auth')).toBe(token);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(refreshToken);


      const tokenObject = createCookieTokenStore("__", true);

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(Cookies.get('___auth')).toBeUndefined();
      expect(Cookies.get('___auth_type')).toBeUndefined();
      expect(Cookies.get('___state')).toBeUndefined();
      expect(Cookies.get('___refresh')).toBeUndefined();

      expect(subscriber).toHaveBeenCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Cookie and Refresh Cookies JWT both'+
    ' are not have exp param', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0'+
      'NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.Gfx6VO9tcxwk6xqx9yYzSfebfeakZp5'+
      'JYIgP_edcw_A';
      Cookies.set('___auth', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOi'+
      'IxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.Gfx6VO9tcxwk6xqx9yYzSfebfe'+
      'akZp5JYIgP_edcw_A';
      Cookies.set('___refresh', refreshToken);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(Cookies.get('___auth')).toBe(token);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(refreshToken);


      const tokenObject = createCookieTokenStore("__", true);

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(Cookies.get('___auth')).toBeUndefined();
      expect(Cookies.get('___auth_type')).toBeUndefined();
      expect(Cookies.get('___state')).toBeUndefined();
      expect(Cookies.get('___refresh')).toBeUndefined();

      expect(subscriber).toHaveBeenCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Cookie was already expired but Refresh'+
    ' Cookie is not expired', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0N'+
      'TY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo5NzE0OTc5OTV9.LTw5GVQ3Y4h3'+
      '5tZ6HMSS5fRh8hknu3vM1bN7wx4DvM0';
      Cookies.set('___auth', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiO'+
      'iIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjIwODYzfQ.q'+
      'vc94iV3P4eJQ9Z_Pnjbz2yLs1jz-KGek3uD6kFndEE';
      Cookies.set('___refresh', refreshToken);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(Cookies.get('___auth')).toBe(token);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(refreshToken);

      const tokenObject = createCookieTokenStore("__", true);

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': refreshToken,
          'expiresAt': new Date(8008620863 * 1000),
        },
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(Cookies.get('___auth')).toBeUndefined();
      expect(Cookies.get('___auth_type')).toBeUndefined();
      expect(Cookies.get('___state')).toBeUndefined();
      expect(Cookies.get('___refresh')).toBe(refreshToken);

      expect(subscriber).toHaveBeenCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });

    it('Existing Auth Cookie and Refresh Cookie were already expired', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NT'+
      'Y3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo5NzE0OTc5OTV9.LTw5GVQ3Y4h35t'+
      'Z6HMSS5fRh8hknu3vM1bN7wx4DvM0';
      Cookies.set('___auth', token);

      const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI'+
      'xMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo5NzE0OTc5OTV9.LTw5GVQ'+
      '3Y4h35tZ6HMSS5fRh8hknu3vM1bN7wx4DvM0';
      Cookies.set('___refresh', refreshToken);

      const subscriber = jest.fn();
      expect(subscriber.mock.calls).toHaveLength(0);

      expect(Cookies.get('___auth')).toBe(token);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(refreshToken);

      const tokenObject = createCookieTokenStore("__", true);

      tokenObject.subscribe(subscriber);

      const resp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': null,
      };

      expect(tokenObject.value).toMatchObject(resp);

      expect(Cookies.get('___auth')).toBeUndefined();
      expect(Cookies.get('___auth_type')).toBeUndefined();
      expect(Cookies.get('___state')).toBeUndefined();
      expect(Cookies.get('___refresh')).toBeUndefined();

      expect(subscriber).toHaveBeenCalled();
      expect(subscriber.mock.calls).toHaveLength(1);
      expect(subscriber).toHaveBeenCalledWith(resp);
    });
  });
});

describe('Set New Value with Existing Value [Without Refresh Token]', () => {
  describe('Using Cookie', () => {
    const oldToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
    '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw603AjpA'+
    'qNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
    const oldExp = 8008605195;

    const newToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0'+
    'NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxMTE2NDY0ODI1Nn0.Vf-miK3nrkJ'+
    '1svSRu_4AHmPxVPceN6GqESN7rsffLmg';
    const newExp = 11164648256;

    let subscribeCount: number;
    beforeEach(() => {
      subscribeCount = 0;
      Cookies.set('___auth', oldToken);
      Cookies.set('___auth_type', 'Bearer');
      Cookies.set('___state', '{}');
    });

    afterEach(() => {
      Cookies.remove('___auth');
      Cookies.remove('___auth_type');
      Cookies.remove('___state');
    });

    it('Setting up new token', (done) => {
      expect(Cookies.get('___auth')).toBe(oldToken);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');

      const tokenObject = createCookieTokenStore("__", false);

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': newToken,
          'type': 'Bearer',
          'expiresAt': new Date(newExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {},
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('___auth')).toBe(oldToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('___auth')).toBe(newToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': newToken,
          'type': 'Bearer',
        },
      });
    }, 10000);

    it('Setting up new User State', (done) => {
      expect(Cookies.get('___auth')).toBe(oldToken);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');

      const tokenObject = createCookieTokenStore("__", false);

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {
          'a': 'b',
        },
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('___auth')).toBe(oldToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('___auth')).toBe(oldToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{"a":"b"}');
          done();
        }
      });

      tokenObject.set({
        userState: {
          'a': 'b',
        },
      });
    }, 10000);

    it('Setting up new token and new state', (done)=>{
      expect(Cookies.get('___auth')).toBe(oldToken);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');

      const tokenObject = createCookieTokenStore("__", false);

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': newToken,
          'type': 'Bearer',
          'expiresAt': new Date(newExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {
          'a': 'b',
        },
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('___auth')).toBe(oldToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('___auth')).toBe(newToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{"a":"b"}');
          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': newToken,
          'type': 'Bearer',
        },
        'userState': {
          'a': 'b',
        },
      });
    }, 10000);

    it('Setting up new tampered token and new state', (done)=>{
      expect(Cookies.get('___auth')).toBe(oldToken);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');

      const tokenObject = createCookieTokenStore("__", false);

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {},
      };

      const newResp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': null,
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('___auth')).toBe(oldToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('___auth')).toBeUndefined();
          expect(Cookies.get('___auth_type')).toBeUndefined();
          expect(Cookies.get('___state')).toBeUndefined();
          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': 'tampered_',
          'type': 'Bearer',
        },
        'userState': {
          'a': 'b',
        },
      });

    }, 10000);

    it('Setting up new expired token and new state', (done)=>{
      expect(Cookies.get('___auth')).toBe(oldToken);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');

      const tokenObject = createCookieTokenStore("__", false);

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': {},
      };

      const newResp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': null,
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('___auth')).toBe(oldToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('___auth')).toBeUndefined();
          expect(Cookies.get('___auth_type')).toBeUndefined();
          expect(Cookies.get('___state')).toBeUndefined();
          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY'+
          '3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo5NzE0OTc5OTV9.LTw5GVQ3Y4h'+
          '35tZ6HMSS5fRh8hknu3vM1bN7wx4DvM0',
          'type': 'Bearer',
        },
        'userState': {
          'a': 'b',
        },
      })
    }, 10000);

    it('Removing Auth Token', (done)=>{
      expect(Cookies.get('___auth')).toBe(oldToken);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');

      const tokenObject = createCookieTokenStore("__", false);

      const newResp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': false,
        'refresh': null,
        'userState': null,
      };

      tokenObject.subscribe((data) => {
        expect(data).toMatchObject(newResp);
        expect(Cookies.get('__')).toBeUndefined();
        expect(Cookies.get('___type')).toBeUndefined();
        expect(Cookies.get('___state')).toBeUndefined();
        done();
      });

      tokenObject.set({
        'auth': null,
      });
    }, 10000);
  });

});

describe('Set New Value with Existing Value [With Refresh Token]', () => {
  describe('Using Cookie', () => {
    const oldToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM'+
    '0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw603AjpA'+
    'qNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8';
    const oldExp = 8008605195;

    const newToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0'+
    'NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxMTE2NDY0ODI1Nn0.Vf-miK3nrkJ'+
    '1svSRu_4AHmPxVPceN6GqESN7rsffLmg';
    const newExp = 11164648256;

    let subscribeCount: number;
    beforeEach(() => {
      subscribeCount = 0;
      Cookies.set('___auth', oldToken);
      Cookies.set('___auth_type', 'Bearer');
      Cookies.set('___state', '{}');
      Cookies.set('___refresh', oldToken);
    });

    afterEach(() => {
      Cookies.remove('___auth');
      Cookies.remove('___auth_type');
      Cookies.remove('___state');
      Cookies.remove('___refresh');
    });

    it('Setting up new Auth token', (done) => {
      expect(Cookies.get('___auth')).toBe(oldToken);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);


      const tokenObject = createCookieTokenStore("__", true);

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': newToken,
          'type': 'Bearer',
          'expiresAt': new Date(newExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('___auth')).toBe(oldToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);
          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('___auth')).toBe(newToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': newToken,
          'type': 'Bearer',
        },
      });
    }, 10000);

    it('Setting up new User State', (done) => {
      expect(Cookies.get('___auth')).toBe(oldToken);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);


      const tokenObject = createCookieTokenStore("__", true);

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {
          'a': 'b',
        },
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('___auth')).toBe(oldToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('___auth')).toBe(oldToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{"a":"b"}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          done();
        }
      });

      tokenObject.set({
        userState: {
          'a': 'b',
        },
      });
    }, 10000);

    it('Setting up new token and new state', (done)=>{
      expect(Cookies.get('___auth')).toBe(oldToken);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);

      const tokenObject = createCookieTokenStore("__", true);

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': newToken,
          'type': 'Bearer',
          'expiresAt': new Date(newExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {
          'a': 'b',
        },
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('___auth')).toBe(oldToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('___auth')).toBe(newToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{"a":"b"}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': newToken,
          'type': 'Bearer',
        },
        'userState': {
          'a': 'b',
        },
      });
    }, 10000);

    it('Setting up new tampered token and new state', (done)=>{
      expect(Cookies.get('___auth')).toBe(oldToken);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);

      const tokenObject = createCookieTokenStore("__", true);

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': null,
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('___auth')).toBe(oldToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);
          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('___auth')).toBeUndefined();
          expect(Cookies.get('___auth_type')).toBeUndefined();
          expect(Cookies.get('___state')).toBeUndefined();
          expect(Cookies.get('___refresh')).toBeUndefined();

          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': 'tampered_',
          'type': 'Bearer',
        },
        'userState': {
          'a': 'b',
        },
      });
    }, 10000);

    it('Setting up new expired token and new state', (done)=>{
      expect(Cookies.get('___auth')).toBe(oldToken);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);


      const tokenObject = createCookieTokenStore("__", true);

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': null,
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('___auth')).toBe(oldToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('___auth')).toBeUndefined();
          expect(Cookies.get('___auth_type')).toBeUndefined();
          expect(Cookies.get('___state')).toBeUndefined();
          expect(Cookies.get('___refresh')).toBeUndefined();

          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY'+
          '3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo5NzE0OTc5OTV9.LTw5GVQ3Y4h'+
          '35tZ6HMSS5fRh8hknu3vM1bN7wx4DvM0',
          'type': 'Bearer',
        },
        'userState': {
          'a': 'b',
        },
      });
    }, 10000);

    it('Removing Auth Token', (done)=>{
      expect(Cookies.get('___auth')).toBe(oldToken);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);


      const tokenObject = createCookieTokenStore("__", true);

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': null,
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('___auth')).toBe(oldToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('___auth')).toBeUndefined();
          expect(Cookies.get('___auth_type')).toBeUndefined();
          expect(Cookies.get('___state')).toBeUndefined();
          expect(Cookies.get('___refresh')).toBeUndefined();

          done();
        }
      });

      tokenObject.set({
        'auth': null,
      });
    }, 10000);

    // / Refresh

    it('Setting up new Refresh token', (done) => {
      expect(Cookies.get('___auth')).toBe(oldToken);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);


      const tokenObject = createCookieTokenStore("__", true);

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': newToken,
          'expiresAt': new Date(newExp * 1000),
        },
        'userState': {},
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('___auth')).toBe(oldToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('___auth')).toBe(oldToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(newToken);

          done();
        }
      });

      tokenObject.set({
        refresh: newToken,
      });
    }, 10000);

    it('Setting up new tampered Refresh token', (done)=>{
      expect(Cookies.get('___auth')).toBe(oldToken);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);


      const tokenObject = createCookieTokenStore("__", true);

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': null,
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('___auth')).toBe(oldToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);
          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('___auth')).toBeUndefined();
          expect(Cookies.get('___auth_type')).toBeUndefined();
          expect(Cookies.get('___state')).toBeUndefined();
          expect(Cookies.get('___refresh')).toBeUndefined();

          done();
        }
      });

      tokenObject.set({
        refresh: 'tempered_',
      });
    }, 10000);

    it('Setting up new expired Refresh token', (done)=>{
      expect(Cookies.get('___auth')).toBe(oldToken);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);


      const tokenObject = createCookieTokenStore("__", true);

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': null,
        'isSignIn': false,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': null,
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('___auth')).toBe(oldToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('___auth')).toBeUndefined();
          expect(Cookies.get('___auth_type')).toBeUndefined();
          expect(Cookies.get('___state')).toBeUndefined();
          expect(Cookies.get('___refresh')).toBeUndefined();

          done();
        }
      });

      tokenObject.set({
        refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3O'+
        'DkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo5NzE0OTc5OTV9.LTw5GVQ3Y4h35tZ'+
        '6HMSS5fRh8hknu3vM1bN7wx4DvM0',
      });
    }, 10000);

    it('Removing Refresh Token', (done)=>{
      expect(Cookies.get('___auth')).toBe(oldToken);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);


      const tokenObject = createCookieTokenStore("__", true);

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': null,
        'userState': {},
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('___auth')).toBe(oldToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('___auth')).toBe(oldToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBeUndefined();

          done();
        }
      });

      tokenObject.set({
        'refresh': null,
      });
    }, 10000);

    it('Setting up new Auth and Refresh token', (done) => {
      expect(Cookies.get('___auth')).toBe(oldToken);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);


      const tokenObject = createCookieTokenStore("__", true);

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': newToken,
          'type': 'Bearer',
          'expiresAt': new Date(newExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': newToken,
          'expiresAt': new Date(newExp * 1000),
        },
        'userState': {},
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('___auth')).toBe(oldToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('___auth')).toBe(newToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(newToken);

          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': newToken,
          'type': 'Bearer',
        },
        'refresh': newToken,
      });
    }, 10000);

    it('Setting up new state', (done)=>{
      expect(Cookies.get('___auth')).toBe(oldToken);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);

      const tokenObject = createCookieTokenStore("__", true);
      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': newToken,
          'expiresAt': new Date(newExp * 1000),
        },
        'userState': {
          'a': 'b',
        },
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('___auth')).toBe(oldToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('___auth')).toBe(oldToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{"a":"b"}');
          expect(Cookies.get('___refresh')).toBe(newToken);

          done();
        }
      });

      tokenObject.set({
        'refresh': newToken,
        'userState': {
          'a': 'b',
        },
      });
    }, 10000);

    it('Setting up new Auth token, Refresh token and new state', (done)=>{
      expect(Cookies.get('___auth')).toBe(oldToken);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);


      const tokenObject = createCookieTokenStore("__", true);

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': newToken,
          'type': 'Bearer',
          'expiresAt': new Date(newExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': newToken,
          'expiresAt': new Date(newExp * 1000),
        },
        'userState': {},
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('___auth')).toBe(oldToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('___auth')).toBe(newToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(newToken);

          done();
        }
      });

      tokenObject.set({
        'auth': {
          'token': newToken,
          'type': 'Bearer',
        },
        'refresh': newToken,
      });
    }, 10000);

    it('Setting up new Refresh token and new state', (done)=>{
      expect(Cookies.get('___auth')).toBe(oldToken);
      expect(Cookies.get('___auth_type')).toBe('Bearer');
      expect(Cookies.get('___state')).toBe('{}');
      expect(Cookies.get('___refresh')).toBe(oldToken);


      const tokenObject = createCookieTokenStore("__", true);

      const resp = {
        'auth': {
          'token': oldToken,
          'type': 'Bearer',
          'expiresAt': new Date(oldExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': oldToken,
          'expiresAt': new Date(oldExp * 1000),
        },
        'userState': {},
      };

      const newResp = {
        'auth': {
          'token': newToken,
          'type': 'Bearer',
          'expiresAt': new Date(newExp * 1000),
        },
        'isSignIn': true,
        'isUsingRefreshToken': true,
        'refresh': {
          'token': newToken,
          'expiresAt': new Date(newExp * 1000),
        },
        'userState': {
          'a': 'b',
        },
      };

      tokenObject.subscribe((data) => {
        if (subscribeCount == 0) {
          expect(data).toMatchObject(resp);
          expect(Cookies.get('___auth')).toBe(oldToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{}');
          expect(Cookies.get('___refresh')).toBe(oldToken);

          subscribeCount++;
        } else {
          expect(data).toMatchObject(newResp);
          expect(Cookies.get('___auth')).toBe(newToken);
          expect(Cookies.get('___auth_type')).toBe('Bearer');
          expect(Cookies.get('___state')).toBe('{"a":"b"}');
          expect(Cookies.get('___refresh')).toBe(newToken);

          done();
        }
      });

      tokenObject.set({
        'refresh': newToken,
        'auth': {
          token: newToken,
          type: 'Bearer',
        },
        'userState': {
          'a': 'b',
        },
      });
    }, 10000);
  });
});
