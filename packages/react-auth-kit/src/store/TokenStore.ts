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

import {ITokenStore} from "./ITokenStore";
import {UpdatedAuthKitState} from "./types";
import {BehaviorSubject, skip} from "rxjs";
import {AuthKitState} from "../types";
import deepEqual from "deep-equal";
import {IStorage} from "../storage";
import {IToken} from "../token";
import {IStorageNamingStrategy} from "../storage";
import TryOrDefault from "../utils/tryOrDefault";

class TokenStore<T> implements ITokenStore<T> {

  /**
   * Boolean value to check if the application
   * is using the refresh token feature or not
   */
  private readonly isUsingRefreshToken: boolean;

  /**
   * Storage - Storage interface to store the tokens
   *
   * This can be a cookie or localstorage
   * depending on the `authType` parameter
   */
  private readonly storage: IStorage;

  /**
   * Storage Naming Strategy - Storage Naming Strategy interface to
   * get the storage names for the tokens
   *
   * This will be used to get the storage names for the auth token,
   * auth type, user state, and refresh token
   */
  private readonly storageNamingStrategy: IStorageNamingStrategy;

  /**
   * Token - Token interface to get the expiration time of the tokens
   *
   * This will be used to get the expiration time of the auth token and
   * refresh token
   */
  private readonly token: IToken;

  /**
   * Auth Value - The current state of the AuthKit
   *
   * This will be used to store the current state of the AuthKit,
   * which includes the auth token, refresh token, user state, and
   * whether the user is signed in or not
   */
  private authValue: AuthKitState<T>;

  /**
   * Auth Subject - The BehaviorSubject to hold the current state of the AuthKit
   *
   * This will be used to emit the current state of the AuthKit to the subscribers
   */
  private authSubject: BehaviorSubject<AuthKitState<T>>;

  /**
   * Debug - Whether to run in debug mode or not
   *
   * If `true`, then the debug messages will be logged to the console
   * If `false`, then no debug messages will be logged
   */
  private readonly debug: boolean;

  /**
   * Constructor for the TokenStore
   *
   * @param isUsingRefreshToken - Boolean value to check if the application
   * is using the refresh token feature or not
   * @param storage - Storage interface to store the tokens
   * @param storageNamingStrategy - Storage Naming Strategy interface to get the storage names for the tokens
   * @param token - Token interface to get the expiration time of the tokens
   * @param debug - Whether to run in debug mode or not
   */
  constructor(
    isUsingRefreshToken: boolean,
    storage: IStorage,
    storageNamingStrategy: IStorageNamingStrategy,
    token: IToken,
    debug: boolean,
  ) {
    this.storage = storage;
    this.storageNamingStrategy = storageNamingStrategy;
    this.token = token;
    this.debug = debug;

    this.isUsingRefreshToken = isUsingRefreshToken;

    this.authValue = this.initialToken_();
    this.authSubject = new BehaviorSubject(this.authValue);

    this.log(`Initial Value`, this.authValue);

    this.authSubject.pipe(skip(1)).subscribe({
      next: this.syncTokens,
    });
  }

  /**
   * Subscribe method for TokenObject
   *
   * @param next - A callback function that gets called by the producer during
   * the subscription when the producer "has" the `value`. It won't be called
   * if `error` or `complete` callback functions have been called
   * @param error - A callback function that gets called by the producer
   * if and when it encountered a problem of any kind
   * @param complete - A callback function that gets called by the producer
   * if and when it has no more values to provide
   */
  subscribe = (
    next: ((value: AuthKitState<T>) => void),
    error?: ((err: any) => void),
    complete?: (() => void),
  ) => {
    this.authSubject.subscribe({
      next: next,
      error: error,
      complete: complete,
    });
  };

  /**
   * @internal
   * @param data - The data to set the state
   *
   * @remarks
   * Below is the logic
   * ```txt
   * data
   *  |
   *  |---- new user state is present ----- Replace User state
   *  |
   *  |
   *  |---- new auth is present ----------- Replace Auth token
   *  |   |     and not null
   *  |   |
   *  |   |
   *  |   |
   *  |   ---- new auth is null ----------------------- Clean auth and
   *  |   |                                               user state
   *  |   |
   *  |   ---- no new auth data ----------------------- Do nothing use the
   *  |            present                            old auth and user state
   *  |
   *  -- is using refresh token is true - new refresh is ---- Update the
   *   |                               |   present is       refresh token
   *   |                               |    not null
   *   |                               |
   *   |                               |
   *   |                               - new refresh ------- Clean refresh token
   *   |                               |   is null
   *   |                               |
   *   |                               - no new refresh ---- Do nothing use
   *   |                                                     the old refresh
   *   |
   *   -- is using refresh token is false ------------------ Do nothing use
   *                                                         the old refresh
   * ```
   */
  set = (data: UpdatedAuthKitState<T>) => {
    // Before setting need to check the tokens.
    this.log(`Set Function is called with`, data);
    this.log(`Set Function Old Data`, this.value);

    let obj = {...this.value};

    // If the user state is present, then replace the user state
    if (data.userState !== undefined) {
      obj.userState = data.userState;
    }

    // If the auth token is present, then replace the auth token
    if (data.auth) {
      try{
        const exp = this.token.getExpiresAt(data.auth.token);
        if (exp > new Date()) {
          obj = {
            ...obj,
            auth: {
              'token': data.auth.token,
              'type': data.auth.type,
              'expiresAt': exp,
            },
            isSignIn: true,
          };
        } else {
          obj = {
            ...obj,
            auth: null,
            isSignIn: false,
            userState: null,
          };
        }
      }
      catch (e) {
        obj = {
          ...obj,
          auth: null,
          isSignIn: false,
          userState: null,
        };
      }

    }

    // If the auth token is null, then clean the auth and user state
    else if (data.auth === null) {
      // sign out
      obj = {
        ...obj,
        auth: null,
        isSignIn: false,
        userState: null,
      };
    }

    // If the refresh token is present, and we are using the refresh token
    if (this.isUsingRefreshToken) {
      // If the refresh token is present, then replace the refresh token with logout
      if (obj.auth === null) {
        obj = {
          ...obj,
          refresh: null,
        };
      }

      // If the refresh token is present, then replace the refresh token
      else if (data.refresh) {
        try{
          const refreshExpireTime = this.token.getExpiresAt(data.refresh);
          if (refreshExpireTime > new Date()) {
            obj = {
              ...obj,
              refresh: {
                'token': data.refresh,
                'expiresAt': refreshExpireTime,
              },
              isUsingRefreshToken: true
            };
          } else {
            obj = {
              ...obj,
              refresh: null,
              auth: null,
              isSignIn: false,
              userState: null,
            }
          }
        }
        catch (e) {
          this.log(`Error Occurred in setting the refresh token`, e);
          obj = {
            ...obj,
            refresh: null,
            auth: null,
            isSignIn: false,
            userState: null,
          };
        }
      }

      // If the refresh token is null, then clean the refresh token
      else if (data.refresh === null) {
        obj = {
          ...obj,
          refresh: null,
        };
      }
    }

    this.log(`Set Function New Data`, obj);
    // If the new object is not equal to the old object, then update the value
    // and emit the new value to the subscribers
    if (!deepEqual(this.value, obj)) {
      this.log('Updating the value in the Set Function', this.value, obj);
      this.authValue = obj;
      this.authSubject.next(obj);
    }
  };

  /**
   * Getter for the current state for TokenObject
   */
  get value() {
    return this.authSubject.value;
  }

  /**
   * Get the Initial Tokens and states from storage
   * when the Application is bootstrapping or refreshed
   *
   * @remarks
   * If the `authStorageType` is `cookie`,
   * get information from the `initialCookieToken ()` function
   *
   * If the `authTokenType` is `localStorage`
   * get information from `initialLSToken()` function
   *
   * @returns Initial State
   */
  private initialToken_ = (): AuthKitState<T> => {
    try {
      const authToken = TryOrDefault.method(this.storage.get, this.storage, null, this.storageNamingStrategy.getAuthStorageName());
      const authTokenType = TryOrDefault.method(this.storage.get, this.storage, null, this.storageNamingStrategy.getAuthTypeStorageName());
      const stateCookie = TryOrDefault.method(this.storage.get, this.storage, null, this.storageNamingStrategy.getStateStorageName());

      const refreshToken = this.isUsingRefreshToken ?
        TryOrDefault.method(this.storage.get, this.storage, null, this.storageNamingStrategy.getRefreshTokenStorageName()) : null;

      return this.checkTokenExist_(
        authToken,
        authTokenType,
        stateCookie,
        refreshToken,
      );
    }
    catch (e) {
      console.error(e);
      this.log(`Error Occurred in initialToken_()`);
      // If any error occurs, then return the default state
      return {
        auth: null,
        refresh: null,
        userState: null,
        isUsingRefreshToken: this.isUsingRefreshToken,
        isSignIn: false,
      };
    }

  };

  /**
   * Check for all the existence for the Tokens
   * Called Internally by `initialCookieToken_()` and `initialLSToken_()`
   *
   * @param authToken - Auth token from cookie or localstorage
   * @param authTokenType - Auth token type from cookie or localstorage
   * @param stateCookie - User state from cookie of localstorage
   * @param refreshToken - Refresh token from cookie or localstorage
   *
   * @returns Auth State with all conditions and guard in place
   */
  private checkTokenExist_ = (
    authToken: string| null,
    authTokenType: string | null,
    stateCookie: string | null,
    refreshToken: string | null,
  ): AuthKitState<T> => {
    this.log('checkTokenExist_ is called');
    this.log(
      `Params: authToken: ${authToken}, authTokenType: ${authTokenType},
      stateCookie: ${stateCookie}, refreshToken: ${refreshToken}`,
    );

    try {
      // Work on refresh first
      let refresh;
      if (this.isUsingRefreshToken && !!refreshToken) {
        this.log(
          `checkTokenExist - isUsingRefreshToken
          = ${this.isUsingRefreshToken} refreshToken - ${refreshToken}`,
        );
        // If the refresh token is tampered with,
        // then it'll stop the execution and will go at catch.
        const refreshTokenExpiresAt = this.token.getExpiresAt(refreshToken);

        // If the refresh token is expired, then set it to null
        if (this.token.getExpiresAt(refreshToken) < new Date()) {
          this.log(
            `checkTokenExist - refresh token is expired
            ${refreshTokenExpiresAt} ${new Date()}`,
          );
          refresh = null;
        }
        // If the refresh token is valid, then assign it
        else {
          this.log(
            `checkTokenExist - new refresh token is assigned
            ${refreshToken}`,
          );
          refresh = {
            token: refreshToken,
            expiresAt: refreshTokenExpiresAt,
          };
        }
      }
      // If not using the refresh feature, set refresh to null
      else {
        this.log(
          `checkTokenExist - Refresh Token is invalid or not using
           refresh feature ${this.isUsingRefreshToken} ${refreshToken}`,
        );
        refresh = null;
      }

      // If we are using the refresh token, but refresh is null,
      // Then definitely we are not able to get the refresh token,
      // or the refresh token is expired.
      // So, we'll not authenticate the user.
      // And will delete any token if there's any
      if (this.isUsingRefreshToken && !refresh) {
        this.log(
          `checkTokenExist - Removing Refresh Token`,
        );
        this.removeAllToken();
        return {
          auth: null,
          refresh: null,
          userState: null,
          isUsingRefreshToken: this.isUsingRefreshToken,
          isSignIn: false,
        };
      }

      // Work on the Auth token and auth state
      let auth;
      let authState: T | null;
      if (!!authToken && !!authTokenType && !!stateCookie) {
        // Using a local Try catch, as we don't want
        // the auth token to make the refresh token to be null;
        this.log(
          `checkTokenExist - authToken, authTokenType, stateCookie exists`,
        );
        try {
          const expiresAt = this.token.getExpiresAt(authToken);
          if (expiresAt < new Date()) {
            this.log(
              `checkTokenExist - auth token is expired
              ${expiresAt} ${new Date()}`,
            );
            auth = null;
            authState = null;
          } else {
            try {
              authState = JSON.parse(stateCookie.replaceAll('\\', '')) as T;
              auth = {
                token: authToken,
                type: authTokenType,
                expiresAt: expiresAt,
              };
            } catch (err) {
              this.log('state cookie JSON parsing failed ${err}');
              auth = null;
              authState = null;
            }
          }
        } catch (e) {
          this.log(
            `checkTokenExist - auth token or auth state is invalid
            ${authToken} ${stateCookie}`,
          );
          this.log(`Error Occurred: ${e}`);
          auth = null;
          authState = null;
        }
      }
      else {
        this.log(
          `checkTokenExist `+
          `- authToken, authTokenType, stateCookie doesn't exists`,
        );
        auth = null;
        authState = null;
      }


      if (this.isUsingRefreshToken && refresh) {
        if (!!auth && !!authState) {
          this.log('checkTokenExist - Returning auth and refresh');
          this.log({
            auth: auth,
            refresh: refresh,
            userState: authState,
            isUsingRefreshToken: this.isUsingRefreshToken,
            isSignIn: true,
          });
          return {
            auth: auth,
            refresh: refresh,
            userState: authState,
            isUsingRefreshToken: this.isUsingRefreshToken,
            isSignIn: true,
          };
        }
        this.log('checkTokenExist - Removing Auth Token');
        this.removeAuth();
        this.log({
          auth: null,
          refresh: refresh,
          userState: null,
          isUsingRefreshToken: this.isUsingRefreshToken,
          isSignIn: false,
        });
        return {
          auth: null,
          refresh: refresh,
          userState: null,
          isUsingRefreshToken: this.isUsingRefreshToken,
          isSignIn: false,
        };
      } else if (!this.isUsingRefreshToken && !!auth && !!authState) {
        this.log('checkTokenExist - Returning auth');
        this.log({
          auth: auth,
          refresh: null,
          userState: authState,
          isUsingRefreshToken: this.isUsingRefreshToken,
          isSignIn: true,
        });
        return {
          auth: auth,
          refresh: null,
          userState: authState,
          isUsingRefreshToken: this.isUsingRefreshToken,
          isSignIn: true,
        };
      } {
        this.log('checkTokenExist- removing all tokens. Returning null');
        this.removeAllToken();
        return {
          auth: null,
          refresh: null,
          userState: null,
          isUsingRefreshToken: this.isUsingRefreshToken,
          isSignIn: false,
        };
      }
    } catch (e) {
      // Error occurred. So declaring as signed out
      this.log(`Error Occurred in checkTokenExist_()`, e);
      this.removeAllToken();
      return {
        auth: null,
        refresh: null,
        userState: null,
        isUsingRefreshToken: this.isUsingRefreshToken,
        isSignIn: false,
      };
    }
  };

  /**
   * Sync Auth Tokens on time of login and logout
   *
   * Set the New Cookies or new Localstorage on login
   * Or Remove the old Cookies or old Localstorage on logout
   *
   * @param authState - Current Auth State
   */
  public syncTokens = (authState: AuthKitState<T>): void => {
    if (authState.auth) {
      // Sync the Auth token part
      this.setAuthToken(
        authState.auth.token,
        authState.auth.type,
        authState.userState,
      );
    } else {
      // Remove the auth token part
      this.removeAuth();
    }

    if (!!authState.refresh && this.isUsingRefreshToken) {
      // Sync the refresh part
      this.setRefreshToken(
        authState.refresh.token,
      );
    } else {
      // Remove the refresh part
      this.removeRefresh();
    }
  };

  private setAuthToken = (
    authToken: string,
    authTokenType: string,
    authState: T | null,
  ): void => {
    const expiresAt = this.token.getExpiresAt(authToken);
    this.storage.set(this.storageNamingStrategy.getAuthStorageName(), authToken, expiresAt);
    this.storage.set(this.storageNamingStrategy.getAuthTypeStorageName(), authTokenType, expiresAt);
    if (authState){
      this.storage.set(this.storageNamingStrategy.getStateStorageName(), JSON.stringify(authState), expiresAt);
    }
  };

  private setRefreshToken = (
    refreshToken: string | null,
  ): void => {
    if(this.isUsingRefreshToken && !!refreshToken){
      const refreshTokenExpiresAt = this.token.getExpiresAt(refreshToken);
      this.storage.set(this.storageNamingStrategy.getRefreshTokenStorageName(), refreshToken, refreshTokenExpiresAt);

    }
  };

  /**
   * Remove Tokens on time of Logout
   */
  private removeAllToken = (): void => {
    this.storage.remove(this.storageNamingStrategy.getAuthStorageName());
    this.storage.remove(this.storageNamingStrategy.getAuthTypeStorageName());
    this.storage.remove(this.storageNamingStrategy.getStateStorageName());
    if (this.isUsingRefreshToken) {
      this.storage.remove(this.storageNamingStrategy.getRefreshTokenStorageName());
    }
  };

  /**
   * Remove Tokens on time of Logout
   */
  private removeAuth = (): void => {
    this.storage.remove(this.storageNamingStrategy.getAuthStorageName());
    this.storage.remove(this.storageNamingStrategy.getAuthTypeStorageName());
    this.storage.remove(this.storageNamingStrategy.getStateStorageName());
  };

  /**
   * Remove Tokens on time of Logout
   */
  private removeRefresh = (): void => {
    if (this.isUsingRefreshToken) {
      this.storage.remove(this.storageNamingStrategy.getRefreshTokenStorageName());
    }
  };

  /**
   * Log function
   * @param msg - The Message to log to the console
   * @param optionalParams - Optional Parameter
   */
  private log = (msg: any, ...optionalParams: any[]): void => {
    if (this.debug) {
      console.log(`React Auth Kit - Message ${JSON.stringify(msg)} [ ${JSON.stringify(optionalParams)} ]`);
    }
  };
}

export default TokenStore;
