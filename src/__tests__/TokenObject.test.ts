/*
 * Copyright 2021 Arkadip Bhattacharya
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
import TokenObject from '../TokenObject';
import {AuthKitStateInterface, AuthStateUserObject} from '../types';

describe('isUsingRefreshToken value is as expected', () => {
  it('isUsingRefreshToken is false', () => {
    const tokenObject = new TokenObject(
        '__',
        'cookie',
        null,
        window.location.hostname,
        window.location.protocol === 'https:',
    );

    expect(tokenObject.initialToken().isUsingRefreshToken).toBe(false);
  });

  it('isUsingRefreshToken is true', () => {
    const tokenObject = new TokenObject(
        '__',
        'cookie',
        '__r',
        window.location.hostname,
        window.location.protocol === 'https:',
    );

    expect(tokenObject.initialToken().isUsingRefreshToken).toBe(true);
  });
});

describe('Token with Cookie', () => {
  let tokenObject: TokenObject;
  beforeEach(() => {
    tokenObject = new TokenObject(
        '__',
        'cookie',
        null,
        window.location.hostname,
        window.location.protocol === 'https:',
    );
  });
  it('Initially blank and signed out state', () => {
    const {isSignIn, auth, refresh} = tokenObject.initialToken();

    expect(isSignIn).toBe(false);
    expect(auth).toBe(null);
    expect(refresh).toBe(null);
  });
});

// syncTokens
// - withAuth
//   - usingRefreshToken
//     - cookie
//     - localstorage
//   - notUsingRefreshToken
//     - cookie
//     - localstorage
// - withoutAuth
//   - cookie
//   - localstorage

describe('syncTokens', () => {
  let tokenObject: TokenObject;
  const authStorageName = '__';
  const refreshTokenName = '__refreshTokenName';
  const cookieDomain = window.location.hostname;
  const cookieSecure = window.location.protocol === 'https:';

  const authTimeStorageName = `${authStorageName}_storage`;
  const authStorageTypeName = `${authStorageName}_type`;
  const stateStorageName = `${authStorageName}_state`;
  const refreshTokenTimeName = `${refreshTokenName}_time`;

  const tokenKeys = [
    authStorageName,
    authTimeStorageName,
    authStorageTypeName,
    stateStorageName,
  ];

  const refreshTokenKeys = [refreshTokenName, refreshTokenTimeName];

  beforeEach(() => {
    // init localStorage with data
    tokenKeys.forEach((key) => {
      localStorage.setItem(key, '___');
    });
    refreshTokenKeys.forEach((key) => {
      localStorage.setItem(key, '_____');
    });
  });

  describe('With Auth', () => {
    const authToken = '__authToken';
    const authType = '__authType';
    const authExpiresAt = new Date(2021, 10, 5);
    const refreshToken = '__refreshToken';
    const refreshExpiresAt = new Date(2021, 10, 6);
    const userState = {key: 'val'} as AuthStateUserObject;

    describe('Using Refresh Token', () => {
      const authState = {
        auth: {token: authToken, type: authType, expiresAt: authExpiresAt},
        refresh: {token: refreshToken, expiresAt: refreshExpiresAt},
        userState,
      } as AuthKitStateInterface;

      it('Cookie Type', () => {
        // Arrange
        tokenObject = new TokenObject(
            authStorageName,
            'cookie',
            refreshTokenName,
            cookieDomain,
            cookieSecure,
        );

        // mock Cookie
        Cookies.set = jest.fn();

        // Act
        tokenObject.syncTokens(authState);

        // Assert
        // keys should set after syncTokens
        expect(Cookies.set).toHaveBeenCalledWith(
            authStorageName,
            authState.auth?.token,
            {
              expires: authState.auth?.expiresAt,
              domain: cookieDomain,
              secure: cookieSecure,
            },
        );

        expect(Cookies.set).toHaveBeenCalledWith(
            authStorageTypeName,
            authState.auth?.type,
            {
              expires: authState.auth?.expiresAt,
              domain: cookieDomain,
              secure: cookieSecure,
            },
        );

        expect(Cookies.set).toHaveBeenCalledWith(
            authTimeStorageName,
            authState.auth?.expiresAt.toISOString(),
            {
              expires: authState.auth?.expiresAt,
              domain: cookieDomain,
              secure: cookieSecure,
            },
        );

        expect(Cookies.set).toHaveBeenCalledWith(
            stateStorageName,
            JSON.stringify(authState.userState),
            {
              expires: authState.auth?.expiresAt,
              domain: cookieDomain,
              secure: cookieSecure,
            },
        );

        expect(Cookies.set).toHaveBeenCalledWith(
            refreshTokenName,
            refreshToken,
            {
              expires: authState.auth?.expiresAt,
              domain: cookieDomain,
              secure: cookieSecure,
            },
        );

        expect(Cookies.set).toHaveBeenCalledWith(
            refreshTokenTimeName,
            authState.refresh?.expiresAt.toISOString(),
            {
              expires: authState.auth?.expiresAt,
              domain: cookieDomain,
              secure: cookieSecure,
            },
        );
      });
      it('LocalStorage Type', () => {
        // Arrange
        tokenObject = new TokenObject(
            authStorageName,
            'localstorage',
            refreshTokenName,
            cookieDomain,
            cookieSecure,
        );

        // Act
        tokenObject.syncTokens(authState);

        // Assert
        // keys should set after syncTokens
        expect(localStorage.getItem(authStorageName)).toEqual(
            authState.auth?.token,
        );
        expect(localStorage.getItem(authStorageTypeName)).toEqual(
            authState.auth?.type,
        );
        expect(localStorage.getItem(authTimeStorageName)).toEqual(
            authState.auth?.expiresAt.toISOString(),
        );
        expect(localStorage.getItem(stateStorageName)).toEqual(
            JSON.stringify(authState.userState),
        );
        expect(localStorage.getItem(refreshTokenName)).toEqual(
            authState.refresh?.token,
        );
        expect(localStorage.getItem(refreshTokenTimeName)).toEqual(
            authState.refresh?.expiresAt.toISOString(),
        );
      });
    });
    describe('Not Using Refresh Token', () => {
      const noRefreshTokenAuthState = {
        auth: {token: authToken, type: authType, expiresAt: authExpiresAt},
        refresh: null,
        userState,
      } as AuthKitStateInterface;

      beforeEach(()=> {
        refreshTokenKeys.forEach((key) => {
          localStorage.removeItem(key);
        });
      });

      it('Cookie Type', () => {
        // Arrange
        tokenObject = new TokenObject(
            authStorageName,
            'cookie',
            null,
            cookieDomain,
            cookieSecure,
        );

        // mock Cookie
        Cookies.set = jest.fn();

        // Act
        tokenObject.syncTokens(noRefreshTokenAuthState);

        // Assert
        // keys should set after syncTokens
        expect(Cookies.set).toHaveBeenCalledWith(
            authStorageName,
            noRefreshTokenAuthState.auth?.token,
            {
              expires: noRefreshTokenAuthState.auth?.expiresAt,
              domain: cookieDomain,
              secure: cookieSecure,
            },
        );

        expect(Cookies.set).toHaveBeenCalledWith(
            authStorageTypeName,
            noRefreshTokenAuthState.auth?.type,
            {
              expires: noRefreshTokenAuthState.auth?.expiresAt,
              domain: cookieDomain,
              secure: cookieSecure,
            },
        );

        expect(Cookies.set).toHaveBeenCalledWith(
            authTimeStorageName,
            noRefreshTokenAuthState.auth?.expiresAt.toISOString(),
            {
              expires: noRefreshTokenAuthState.auth?.expiresAt,
              domain: cookieDomain,
              secure: cookieSecure,
            },
        );

        expect(Cookies.set).toHaveBeenCalledWith(
            stateStorageName,
            JSON.stringify(noRefreshTokenAuthState.userState),
            {
              expires: noRefreshTokenAuthState.auth?.expiresAt,
              domain: cookieDomain,
              secure: cookieSecure,
            },
        );

        expect(Cookies.set).not.toHaveBeenCalledWith(refreshTokenName);
        expect(Cookies.set).not.toHaveBeenCalledWith(refreshTokenTimeName);
      });
      it('LocalStorage Type', () => {
        // Arrange
        tokenObject = new TokenObject(
            authStorageName,
            'localstorage',
            null,
            cookieDomain,
            cookieSecure,
        );

        // Act
        tokenObject.syncTokens(noRefreshTokenAuthState);

        // Assert
        // keys should set after syncTokens
        expect(localStorage.getItem(authStorageName)).toEqual(
            noRefreshTokenAuthState.auth?.token,
        );
        expect(localStorage.getItem(authStorageTypeName)).toEqual(
            noRefreshTokenAuthState.auth?.type,
        );
        expect(localStorage.getItem(authTimeStorageName)).toEqual(
            noRefreshTokenAuthState.auth?.expiresAt.toISOString(),
        );
        expect(localStorage.getItem(stateStorageName)).toEqual(
            JSON.stringify(noRefreshTokenAuthState.userState),
        );

        expect(localStorage.getItem(refreshTokenName)).toBeFalsy();
        expect(localStorage.getItem(refreshTokenTimeName)).toBeFalsy();
      });
    });
  });
  describe('Without Auth: Tokens should removed', () => {
    describe('Using Refresh Token', () => {
      it('Cookie Type', () => {
        // Arrange
        tokenObject = new TokenObject(
            authStorageName,
            'cookie',
            refreshTokenName,
            cookieDomain,
            cookieSecure,
        );

        Cookies.remove = jest.fn();
        const authState = {} as AuthKitStateInterface;

        // Act
        tokenObject.syncTokens(authState);

        // Assert
        // keys should remove after syncTokens
        [...tokenKeys, ...refreshTokenKeys].forEach((key) => {
          expect(Cookies.remove).toHaveBeenCalledWith(key, {
            domain: cookieDomain,
            secure: cookieSecure,
          });
        });
      });

      it('LocalStorage Type', () => {
        // Arrange
        tokenObject = new TokenObject(
            authStorageName,
            'localstorage',
            refreshTokenName,
            cookieDomain,
            cookieSecure,
        );

        const authState = {} as AuthKitStateInterface;
        // keys should exist before syncTokens
        [...tokenKeys, ...refreshTokenKeys].forEach((key) => {
          expect(localStorage.getItem(key)).toBeTruthy();
        });

        // Act
        tokenObject.syncTokens(authState);

        // Assert
        // keys should removed after syncTokens
        [...tokenKeys, ...refreshTokenKeys].forEach((key) => {
          expect(localStorage.getItem(key)).toBeFalsy();
        });
      });
    });

    describe('Not Using Refresh Token', () => {
      beforeEach(()=> {
        refreshTokenKeys.forEach((key) => {
          localStorage.removeItem(key);
        });
      });

      it('Cookie Type', () => {
        // Arrange
        tokenObject = new TokenObject(
            authStorageName,
            'cookie',
            null,
            cookieDomain,
            cookieSecure,
        );

        Cookies.remove = jest.fn();
        const authState = {} as AuthKitStateInterface;

        // Act
        tokenObject.syncTokens(authState);

        // Assert
        // keys should remove after syncTokens
        tokenKeys.forEach((key) => {
          expect(Cookies.remove).toHaveBeenCalledWith(key, {
            domain: cookieDomain,
            secure: cookieSecure,
          });
        });
        refreshTokenKeys.forEach((key) => {
          expect(Cookies.remove).not.toHaveBeenCalledWith(key, {
            domain: cookieDomain,
            secure: cookieSecure,
          });
        });
      });
      it('LocalStorage Type', () => {
        // arrange
        tokenObject = new TokenObject(
            authStorageName,
            'localstorage',
            null,
            cookieDomain,
            cookieSecure,
        );
        const authState = {} as AuthKitStateInterface;
        // keys should exist before syncTokens
        [...tokenKeys].forEach((key) => {
          expect(localStorage.getItem(key)).toBeTruthy();
        });

        // act
        tokenObject.syncTokens(authState);
        // assert
        // keys should removed after syncTokens
        [...tokenKeys].forEach((key) => {
          expect(localStorage.getItem(key)).toBeFalsy();
        });
      });
    });
  });
});

export {};
