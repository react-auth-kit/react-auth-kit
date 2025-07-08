'use client';

import Cookies from 'js-cookie';
import deepEqual from 'deep-equal';
import {BehaviorSubject} from 'rxjs';

import {AuthError} from './errors';
import {AuthKitStateInterface} from './types';

/**
 * Set State Data
 */
export interface AuthKitSetState<T> {

  /**
   * Authentication Object
   */
  auth?: {

    /**
     * JWT access token
     */
    token: string,

    /**
     * Type of the access token
     *
     * @example
     * Bearer
     */
    type: string
  } | null,

  /**
   * Refresh JWT token
   */
  refresh?: string | null,

  /**
   * User state object
   */
  userState?: T
}

/**
 * TokenObject Class.
 * It is holding all the data for the authentication
 */
class TokenObject<T> {
  /**
   * Name of the storage for the access token
   */
  private readonly authStorageName: string;

  /**
   * Name of the storage for the user state
   */
  private readonly stateStorageName: string;

  /**
   * Domain Name for the cookie
   */
  private readonly cookieDomain?: string;

  /**
   * HTTP Secure for the cookie
   */
  private readonly cookieSecure?: boolean;

  /**
   * Name of the storage for the auth token type
   */
  private readonly authStorageTypeName: string;

  /**
   * Type of the Storage to be used to store the data
   */
  private readonly authStorageType: 'cookie' | 'localstorage';

  /**
   * Name of the storage for the refresh token
   */
  private readonly refreshTokenName: string | null;

  /**
   * Boolean value to check if the application
   * is using the refresh token feature or not
   */
  private readonly isUsingRefreshToken: boolean;

  /**
   * Auth Value
   */
  private authValue: AuthKitStateInterface<T>;

  /**
   * RX Auth subject
   */
  private authSubject: BehaviorSubject<AuthKitStateInterface<T>>;

  /**
   * Debug variable. Use to create the debug environment
   */
  private readonly debug: boolean;


  /**
   * TokenObject - Stores, retrieve and process tokens
   *
   * @param authStorageName - Name of the Token,
   * which will store the Authorization Token
   *
   * @param authStorageType - Type of the auth Storage,
   * `cookie` or `localstorage`
   *
   * @param refreshTokenName - Name of the refresh Token,
   * if `undefined`, then no refreshToken feature is using
   *
   * @param debug - Whether to run in debug mode or not
   *
   * @param cookieDomain - domain name for the Cookies,
   * only applicable when `authStorageType` is `cookie`
   *
   * @param cookieSecure - cookies are secure or not,
   * only applicable when `authStorageType` is `cookie`
   *
   */
  constructor(
      authStorageName: string,
      authStorageType: 'cookie' | 'localstorage',
      refreshTokenName: string | null,
      debug: boolean,
      cookieDomain?: string,
      cookieSecure?: boolean,
  ) {
    this.authStorageName = authStorageName;
    this.authStorageType = authStorageType;
    this.stateStorageName = `${authStorageName}_state`;
    this.refreshTokenName = refreshTokenName;
    this.cookieDomain = cookieDomain;
    this.cookieSecure = cookieSecure;
    this.debug = debug;

    this.authStorageTypeName = `${this.authStorageName}_type`;

    this.isUsingRefreshToken = !!this.refreshTokenName;

    this.authValue = this.initialToken_();
    this.authSubject = new BehaviorSubject(this.authValue);

    this.log(`Initial Value`, this.authValue);

    this.authSubject.subscribe({
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
      next: ((value: AuthKitStateInterface<T>) => void),
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
   * Callback hook, when the user is signed in this function will be called
   * @param callback - function to be called
   */
  onSignIn(callback: (value: AuthKitStateInterface<T>)=> void) {
    this.subscribe((value)=> {
      if (value.auth !== null) {
        callback(value);
      }
    });
  }

  /**
   * Callback hook, when the user is signed out, this function will be called
   * @param callback - function to be called
   */
  onSignOut(callback: ()=> void) {
    this.subscribe((value)=> {
      if (value.auth === null) {
        callback();
      }
    });
  }

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
   *  |   |                                               userstate
   *  |   |
   *  |   ---- no new auth data ----------------------- Do nothing use the
   *  |            present                            old auth and user state
   *  |
   *  -- is using refesh token is true - new refresh is ---- Update the
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
  set = (data: AuthKitSetState<T>) => {
    // Before setting need to check the tokens.
    this.log(`Set Function is called with`, data);
    this.log(`Set Function Old Data`, this.value);


    let obj = {...this.value};

    if (data.userState !== undefined) {
      obj.userState = data.userState;
    }

    if (data.auth) {
      try {
        const exp = this.getExpireDateTime(data.auth.token);
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
          throw new AuthError('Given Auth Token is already expired.');
        }
      } catch (e) {
        obj = {
          ...obj,
          auth: null,
          isSignIn: false,
          userState: null,
        };
        throw new AuthError(
            'Error pursing the Auth Token. Make sure you provided a valid JWT.',
        );
      }
    } else if (data.auth === null) {
      // sign out
      obj = {
        ...obj,
        auth: null,
        isSignIn: false,
        userState: null,
      };
    }

    if (this.isUsingRefreshToken) {
      if (obj.auth === null) {
        obj = {
          ...obj,
          refresh: null,
        };
      } else if (data.refresh) {
        try {
          const refreshExpireTime = this.getExpireDateTime(data.refresh);
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
              auth: null,
              isSignIn: false,
              userState: null,
              refresh: null,
            };
            throw new AuthError('Given Refresh Token is already expired.');
          }
        } catch (e) {
          obj = {
            ...obj,
            auth: null,
            isSignIn: false,
            userState: null,
            refresh: null,
          };
          throw new AuthError(
              'Error pursing the Auth Token.'+
              ' Make sure you provided a valid JWT.',
          );
        }
      } else if (data.refresh === null) {
        obj = {
          ...obj,
          refresh: null,
        };
      }
    }
    this.log(`Set Function New Data`, obj);
    if (!deepEqual(this.value, obj)) {
      this.log('Updating the value in the Set Function');
      this.authValue = obj;
      this.authSubject.next(obj);
    }
  };

  /**
   * Getter for currrent state for TokenObject
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
  private initialToken_ = (): AuthKitStateInterface<T> => {
    if (this.authStorageType === 'cookie') {
      return this.initialCookieToken_();
    } else {
      return this.initialLSToken_();
    }
  };

  /**
   * Get the Initial Token from Cookies
   *
   * @remarks
   * If the `authStorageType` is `cookie`,
   * then this function is called
   * And returns the Tokens and states Stored in all 4 cookies
   *
   * @returns Initial State from Cookies
   */
  private initialCookieToken_ = (): AuthKitStateInterface<T> => {
    const authToken = Cookies.get(this.authStorageName);
    const authTokenType = Cookies.get(this.authStorageTypeName);
    const stateCookie = Cookies.get(this.stateStorageName);

    const refreshToken = this.isUsingRefreshToken &&
      this.refreshTokenName != null ? Cookies.get(this.refreshTokenName) : null;

    return this.checkTokenExist_(
        authToken,
        authTokenType,
        stateCookie,
        refreshToken,
    );
  };


  /**
   * Get the Initial Token from LocalStorage
   *
   * @remarks
   * If the `authStorageType` is `localstorage`,
   * then this function is called
   * And returns the Tokens and states Stored in all 4 cookies
   *
   * @returns Initial State from LocalStorage
   */
  private initialLSToken_ = (): AuthKitStateInterface<T> => {
    const authToken = localStorage.getItem(this.authStorageName);
    const authTokenType = localStorage.getItem(this.authStorageTypeName);
    const stateCookie = localStorage.getItem(this.stateStorageName);

    const refreshToken = this.isUsingRefreshToken &&
      this.refreshTokenName != null ?
      localStorage.getItem(this.refreshTokenName) : null;


    return this.checkTokenExist_(
        authToken,
        authTokenType,
        stateCookie,
        refreshToken,
    );
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
      authToken: string | null | undefined,
      authTokenType: string | null | undefined,
      stateCookie: string | null | undefined,
      refreshToken: string | null | undefined,
  ): AuthKitStateInterface<T> => {
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
          = ${this.isUsingRefreshToken} refrehToken - ${refreshToken}`,
        );
        // If the refresh token is tampered with,
        // then it'll stop the execution and will go at catch.
        const refreshTokenExpiresAt = this.getExpireDateTime(refreshToken);
        if (refreshTokenExpiresAt < new Date()) {
          this.log(
              `checkTokenExist - refresh token is expired
            ${refreshTokenExpiresAt} ${new Date()}`,
          );
          refresh = null;
        } else {
          this.log(
              `checkTokenExist - new refresh token is assigned
            ${refreshToken}`,
          );
          refresh = {
            token: refreshToken,
            expiresAt: refreshTokenExpiresAt,
          };
        }
      } else {
        this.log(
            `checkTokenExist - Refesh Token is invalid or not using
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

      // Work on the Auth token and auth starte
      let auth;
      let authState: T | null;
      if (!!authToken && !!authTokenType && !!stateCookie) {
        // Using a local Try catch, as we don't want
        // the auth token to make the refrsh token to be null;
        this.log(
            `checkTokenExist - authToken, authTokenType, stateCookie exists`,
        );
        try {
          const expiresAt = this.getExpireDateTime(authToken);
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
          this.log(`Error Occured: ${e}`);
          auth = null;
          authState = null;
        }
      } else {
        this.log(
            `checkTokenExist `+
            `- authToken, authTokenType, stateCookie doesn't exists`,
        );
        auth = null;
        authState = null;
      }


      if (this.isUsingRefreshToken && refresh) {
        if (!!auth && !!authState) {
          this.log('checkTokenExist - Returning auth and refrsh');
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
   * Function to patse the JWT
   *
   * @param token - JWT to purse
   * @returns Parsed data from JWT
   */
  private parseJwt = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

    return JSON.parse(jsonPayload);
  };

  /**
   * Get the Expire Date from JWT
   *
   * @param token - JWT from which to get the Expire time
   * @returns Expire Date
   *
   * @remarks
   * Get `exp` param from the JWT data payload and convert that to Date
   */
  private getExpireDateTime = (token: string): Date => {
    const jwtData = this.parseJwt(token);
    if (Object.prototype.hasOwnProperty.call(jwtData, 'exp')) {
      const d = new Date(0);
      d.setUTCSeconds(jwtData.exp as number);
      return d;
    } else {
      throw new AuthError('JWT has no exp param');
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
  public syncTokens = (authState: AuthKitStateInterface<T>): void => {
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
    if (this.authStorageType === 'cookie') {
      const expiresAt = this.getExpireDateTime(authToken);
      Cookies.set(this.authStorageName, authToken, {
        expires: expiresAt,
        domain: this.cookieDomain,
        secure: this.cookieSecure,
      });
      Cookies.set(this.authStorageTypeName, authTokenType, {
        expires: expiresAt,
        domain: this.cookieDomain,
        secure: this.cookieSecure,
      });
      if (authState) {
        Cookies.set(this.stateStorageName, JSON.stringify(authState), {
          expires: expiresAt,
          domain: this.cookieDomain,
          secure: this.cookieSecure,
        });
      }
    } else {
      window.localStorage.setItem(this.authStorageName, authToken);
      window.localStorage.setItem(this.authStorageTypeName, authTokenType);

      if (authState) {
        window.localStorage.setItem(
            this.stateStorageName,
            JSON.stringify(authState),
        );
      }
    }
  };

  private setRefreshToken = (
      refreshToken: string | null,
  ): void => {
    if (this.authStorageType === 'cookie') {
      if (this.isUsingRefreshToken && !!this.refreshTokenName &&
        !!refreshToken) {
        const refreshTokenExpiresAt = this.getExpireDateTime(refreshToken);
        Cookies.set(this.refreshTokenName, refreshToken, {
          expires: refreshTokenExpiresAt,
          domain: this.cookieDomain,
          secure: this.cookieSecure,
        });
      }
    } else if (
      this.isUsingRefreshToken &&
      !!this.refreshTokenName && !!refreshToken
    ) {
      localStorage.setItem(this.refreshTokenName, refreshToken);
    }
  };

  /**
   * Remove Tokens on time of Logout
   */
  private removeAllToken = (): void => {
    if (this.authStorageType === 'cookie') {
      this.removeAllCookieToken_();
    } else {
      this.removeAllLSToken_();
    }
  };

  /**
   * Remove Token from Cookies
   */
  private removeAllCookieToken_ = (): void => {
    Cookies.remove(this.authStorageName, {
      domain: this.cookieDomain,
      secure: this.cookieSecure,
    });
    Cookies.remove(this.authStorageTypeName, {
      domain: this.cookieDomain,
      secure: this.cookieSecure,
    });
    Cookies.remove(this.stateStorageName, {
      domain: this.cookieDomain,
      secure: this.cookieSecure,
    });
    if (this.isUsingRefreshToken && !!this.refreshTokenName) {
      Cookies.remove(this.refreshTokenName, {
        domain: this.cookieDomain,
        secure: this.cookieSecure,
      });
    }
  };

  /**
   * Remove Token from LocalStorage
   */
  private removeAllLSToken_ = (): void => {
    localStorage.removeItem(this.authStorageName);
    localStorage.removeItem(this.authStorageTypeName);
    localStorage.removeItem(this.stateStorageName);
    if (this.isUsingRefreshToken && !!this.refreshTokenName) {
      localStorage.removeItem(this.refreshTokenName);
    }
  };

  /**
   * Remove Tokens on time of Logout
   */
  private removeAuth = (): void => {
    if (this.authStorageType === 'cookie') {
      this.removeAuthCookie();
    } else {
      this.removeAuthToken();
    }
  };

  /**
   * Remove Token from Cookies
   */
  private removeAuthCookie = (): void => {
    Cookies.remove(this.authStorageName, {
      domain: this.cookieDomain,
      secure: this.cookieSecure,
    });
    Cookies.remove(this.authStorageTypeName, {
      domain: this.cookieDomain,
      secure: this.cookieSecure,
    });
    Cookies.remove(this.stateStorageName, {
      domain: this.cookieDomain,
      secure: this.cookieSecure,
    });
  };

  /**
   * Remove Token from LocalStorage
   */
  private removeAuthToken = (): void => {
    localStorage.removeItem(this.authStorageName);
    localStorage.removeItem(this.authStorageTypeName);
    localStorage.removeItem(this.stateStorageName);
  };

  /**
   * Remove Tokens on time of Logout
   */
  private removeRefresh = (): void => {
    if (this.authStorageType === 'cookie') {
      this.removeRefreshCookie();
    } else {
      this.removeRefreshLocalStorage();
    }
  };

  /**
   * Remove Token from Cookies
   */
  private removeRefreshCookie = (): void => {
    if (this.isUsingRefreshToken && !!this.refreshTokenName) {
      Cookies.remove(this.refreshTokenName, {
        domain: this.cookieDomain,
        secure: this.cookieSecure,
      });
    }
  };

  /**
   * Remove Token from LocalStorage
   */
  private removeRefreshLocalStorage = (): void => {
    if (this.isUsingRefreshToken && !!this.refreshTokenName) {
      localStorage.removeItem(this.refreshTokenName);
    }
  };

  /**
   * Log function
   * @param msg - The Message to log to the console
   * @param optionalParams - Optional Parameter
   */
  private log = (msg: any, ...optionalParams: any[]): void => {
    if (this.debug) {
      console.log(`React Auth Kit - ${msg}`, optionalParams);
    }
  };
}

export default TokenObject;
