"use client"

import { cookies } from 'next/headers'
import Cookies from 'js-cookie';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthError } from './errors';
import { AuthKitStateInterface } from './types';

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
   * Boolean value to check if the application is using refresh token feature or not
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
   * TokenObject - Stores, retrieve and process tokens
   *
   * @param authStorageName - Name of the Token,
   * which will store the Authorization Token
   *
   * @param authStorageType - Type of the auth Storage, `
   * cookie` or `localstorage`
   *
   * @param refreshTokenName - Name of the refresh Token,
   * if `undefined`, then no refreshToken feature is using
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
    cookieDomain?: string,
    cookieSecure?: boolean,
  ) {
    this.authStorageName = authStorageName;
    this.authStorageType = authStorageType;
    this.stateStorageName = `${authStorageName}_state`;
    this.refreshTokenName = refreshTokenName;
    this.cookieDomain = cookieDomain;
    this.cookieSecure = cookieSecure;

    this.authStorageTypeName = `${this.authStorageName}_type`;

    this.isUsingRefreshToken = !!this.refreshTokenName;

    this.authValue = this.initialToken_();
    this.authSubject = new BehaviorSubject(this.authValue);

    this.authSubject.subscribe({
      next: this.syncTokens,
      complete: () => {
        console.log('Token Synced');
      },
      error: (err) => {
        console.error('Error Occured while syncing token');
        console.log(err);
      },
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
    complete?: (() => void)
  ) => {
    this.authSubject.subscribe({
      next: next,
      error: error,
      complete: complete
    });
  };

  /**
   * Observe method for TokenObject
   * 
   * @returns A RxJs Observable for further subscription
   * 
   * @see {@link https://rxjs.dev/api/index/class/Subject#asObservable}
   */
  observe = (): Observable<AuthKitStateInterface<T>> => {
    return this.authSubject.asObservable();
  };

  /**
   * @internal
   * @param data - The data to set the state
   * 
   * @remarks
   * Below is the logic
   * ```txt
   * data - new auth is present - new user state ----- Replace Auth and 
   *  |   |     and not null    |                         User state
   *  |   |                     |
   *  |   |                     - no new user state --- Replace only 
   *  |   |                                           the Auth use old 
   *  |   |                                              user state
   *  |   |
   *  |   |
   *  |   ---- new auth is null ----------------------- Clean auth and
   *  |   |                                               userstate
   *  |   |
   *  |   ---- no new auth data ----------------------- Do nothing use the
   *  |            present                            old auth ans user state
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
    let obj = this.value;

    if (data.auth) {
      // logged in
      let userState = obj.userState;
      if (data.userState !== undefined) {
        userState = data.userState;
      }

      obj = {
        ...obj,
        auth: {
          'token': data.auth.token,
          'type': data.auth.type,
          'expiresAt': this.getExpireDateTime(data.auth.token),
        },
        isSignIn: true,
        userState: userState,
      };
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
      if (data.refresh) {
        obj = {
          ...obj,
          refresh: {
            'token': data.refresh,
            'expiresAt': this.getExpireDateTime(data.refresh),
          },
        };
      } else if (data.refresh === null) {
        obj = {
          ...obj,
          refresh: null,
        };
      }
    }
    this.authValue = obj;
    this.authSubject.next(obj);
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
   * get information from `initialCookieToken()` function
   *
   * If the `authTokenType` is `localStorage`
   * get information from `initialLSToken()` function
   *
   * @returns Initial State
   */
  private initialToken_ = (): AuthKitStateInterface<T> => {
    if (this.authStorageType === 'cookie') {
      if (typeof window !== undefined) {
        return this.initialCookieToken_();
      }
      else {
        // next js server side rendering
        return this.initialCookieServerToken_();
      }
    } else {
      return this.initialLSToken_();
    }
  };

  /**
   * Get the Initial Token from Cookies
   *
   * @remarks
   * If the `authStorageType` is `cookie`
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
   * Get the Initial Token from Cookies
   *
   * @remarks
   * If the `authStorageType` is `cookie`
   * then this function is called
   * And returns the Tokens and states Stored in all 4 cookies
   *
   * @returns Initial State from Cookies
   */
  private initialCookieServerToken_ = (): AuthKitStateInterface<T> => {
    const cookieStore = cookies();

    const authToken = cookieStore.get(this.authStorageName)?.value;
    const authTokenType = cookieStore.get(this.authStorageTypeName)?.value;
    const stateCookie = cookieStore.get(this.stateStorageName)?.value;

    const refreshToken = this.isUsingRefreshToken &&
      this.refreshTokenName != null ? cookieStore.get(this.refreshTokenName)?.value : null;

    return this.checkTokenExist_(
      authToken,
      authTokenType,
      stateCookie,
      refreshToken,
    );

    // const d = import('next/headers').then(module=> {
    //   const cookieStore = module.cookies();

    //   const authToken = cookieStore.get(this.authStorageName)?.value;
    //   const authTokenType = cookieStore.get(this.authStorageTypeName)?.value;
    //   const stateCookie = cookieStore.get(this.stateStorageName)?.value;

    //   const refreshToken = this.isUsingRefreshToken &&
    //     this.refreshTokenName != null ? cookieStore.get(this.refreshTokenName)?.value : null;

    //   return this.checkTokenExist_(
    //       authToken,
    //       authTokenType,
    //       stateCookie,
    //       refreshToken,
    //   );


    // }).catch(err=>{
    //   console.log(err);
    //   console.error("Server Side Cookies are only supported in Next");
    //   return this.checkTokenExist_(null, null, null, null)
    // })

  };

  /**
   * Get the Initial Token from LocalStorage
   * 
   * @remarks
   * If the `authStorageType` is `localstorage`
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
   * Check for all the existance for the Tokens
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
    refreshToken: string | null | undefined):
    AuthKitStateInterface<T> => {
    try {
      // Work on refresh first
      let refresh;
      if (this.isUsingRefreshToken && !!refreshToken) {
        // If the refresh token is tampered, then it'll stop the execution and will go at catch.
        const refreshTokenExpiresAt = this.getExpireDateTime(refreshToken);
        if (refreshTokenExpiresAt < new Date()) {
          refresh = null;
        } else {
          refresh = {
            token: refreshToken,
            expiresAt: refreshTokenExpiresAt,
          };
        }
      } else {
        refresh = null;
      }

      // If we are using refrsh token, but refesh is null null,
      // Then definitely we are not able to get the refersh token or the refresh token is expired.
      // So, we'll not authenticate the user.
      // And will delete any token, if there's any
      if (this.isUsingRefreshToken && !refresh) {
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
        // Using a local Try catch, as we don't want the auth token to make the refrsh token to be null;
        try {
          const expiresAt = this.getExpireDateTime(authToken);
          if (expiresAt < new Date()) { // DONE
            auth = null;
            authState = null;
          } else {
            authState = JSON.parse(stateCookie) as T;
            auth = {
              token: authToken,
              type: authTokenType,
              expiresAt: expiresAt,
            };
          }
        } catch (e) {
          auth = null;
          authState = null;
        }
      } else {
        auth = null;
        authState = null;
      }


      if (refresh) {
        if (!!auth && !!authState) {
          return {
            auth: auth,
            refresh: refresh,
            userState: authState,
            isUsingRefreshToken: this.isUsingRefreshToken,
            isSignIn: true,
          };
        }
        this.removeAuth();
        return {
          auth: null,
          refresh: refresh,
          userState: null,
          isUsingRefreshToken: this.isUsingRefreshToken,
          isSignIn: false,
        };
      } else if (!this.isUsingRefreshToken && !!auth && !!authState) {
        return {
          auth: auth,
          refresh: null,
          userState: authState,
          isUsingRefreshToken: this.isUsingRefreshToken,
          isSignIn: true,
        };
      } {
        this.removeAllToken();
        return {
          auth: null,
          refresh: null,
          userState: null,
          isUsingRefreshToken: this.isUsingRefreshToken,
          isSignIn: false,
        };
      }
    }
    // Error occured. So declearing as signed out
    catch (e) {
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
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
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
    if (jwtData.hasOwnProperty('exp')) {
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
   * @param authState
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
        window.localStorage.setItem(this.stateStorageName, JSON.stringify(authState));
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
    } else {
      if (this.isUsingRefreshToken && !!this.refreshTokenName && !!refreshToken) {
        localStorage.setItem(this.refreshTokenName, refreshToken);
      }
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
}

export default TokenObject;
