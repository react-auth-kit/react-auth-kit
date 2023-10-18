/**
 * 
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Token Object Engine
 * @copyright Arkadip Bhattacharya 2020
 *
 */


import Cookies from 'js-cookie';
import { BehaviorSubject } from 'rxjs';
import { AuthKitError } from './errors';

interface AuthKitSetState<T> {
  auth?: {
    token: string,
    type: string
  },
  refresh?: string,
  userState?: T
}

interface AuthKitStateInterfaceTrue<T> {
  auth: {
    token: string,
    type: string,
    expiresAt: Date
  },
  refresh: {
    token: string,
    expiresAt: Date
  } | null,
  userState: T | null,
  isSignIn: boolean,
  isUsingRefreshToken: boolean,
}

interface AuthKitStateInterfaceNoAuthOnlyRefresh {
  auth: null,
  refresh: {
    token: string,
    expiresAt: Date
  },
  userState: null,
  isSignIn: boolean,
  isUsingRefreshToken: boolean,
}


interface AuthKitStateInterfaceFalse {
  auth: null,
  refresh: null,
  userState: null,
  isSignIn: boolean,
  isUsingRefreshToken: boolean,
}

type AuthKitStateInterface<T> = AuthKitStateInterfaceTrue<T> | AuthKitStateInterfaceFalse | AuthKitStateInterfaceNoAuthOnlyRefresh


/**
 * @class TokenObject
 *
 * Stores and retrieve Token
 */
class TokenObject<T> {
  private readonly authStorageName: string;
  private readonly stateStorageName: string;
  private readonly cookieDomain?: string;
  private readonly cookieSecure?: boolean;
  private readonly authStorageTypeName: string;
  private readonly authStorageType: 'cookie' | 'localstorage';
  private readonly refreshTokenName: string | null;
  private readonly isUsingRefreshToken: boolean;
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
   * @constructor
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

    this.authSubject = new BehaviorSubject(this.initialToken_());

    this.subscribe(this.syncTokens);
  }

  subscribe(next: ((value: AuthKitStateInterface<T>) => void)) {
    this.authSubject.subscribe({
      next: next
    })
  }

  set(data: AuthKitSetState<T>) {
    // Before setting need to check the tokens.
    let obj = this.value;

    if(!!data.auth){
      // logged in
      let userState = obj.userState;
      if(data.userState !== undefined){
        userState = data.userState;
      }

      obj = {
        ...obj,
        auth: {
          'token': data.auth.token,
          'type': data.auth.type,
          'expiresAt': this.getExpireDateTime_(data.auth.token)
        },
        isSignIn: true,
        userState: userState
      }
    }
    else if (data.auth === null){
      // sign out
      obj = {
        ...obj,
        auth: null,
        isSignIn: false,
        userState: null
      }
    }

    if(this.isUsingRefreshToken){
      if(!!data.refresh){
        obj = {
          ...obj,
          refresh: {
            'token': data.refresh,
            'expiresAt': this.getExpireDateTime_(data.refresh)
          }
        }
      }
      else {
        obj = {
          ...obj,
          refresh: null
        }
      }
    }

    console.log(obj)

    this.authSubject.next(obj);
  }

  get value(): AuthKitStateInterface<T> {
    return this.authSubject.getValue();
  }

  /**
   * Get the Initial Tokens and states
   * Called externally in `AuthProvider`
   * when the Application is bootstrapping or refreshed
   *
   * If the `authStorageType` is `cookie`,
   * get information from `initialCookieToken()` function
   *
   * If the `authTokenType` is `localStorage`
   * get information from `initialLSToken()` function
   *
   * @returns AuthKitStateInterface
   */
  private initialToken_(): AuthKitStateInterface<T> {
    if (this.authStorageType === 'cookie') {
      return this.initialCookieToken_();
    } else {
      return this.initialLSToken_();
    }
  }

  /**
   * Get the Initial Token from Cookies
   * Called internally by `initialToken` method
   *
   * If the `authStorageType` is `cookie`
   * then this function is called
   * And returns the Tokens and states Stored in all 4 cookies
   *
   * @returns AuthKitStateInterface
   */
  private initialCookieToken_(): AuthKitStateInterface<T> {
    const authToken = Cookies.get(this.authStorageName);
    const authTokenType = Cookies.get(this.authStorageTypeName);
    const stateCookie = Cookies.get(this.stateStorageName);

    const refreshToken = this.isUsingRefreshToken &&
      this.refreshTokenName != null ? Cookies.get(this.refreshTokenName) : null;

    return this.checkTokenExist_(
      authToken,
      authTokenType,
      stateCookie,
      refreshToken
    );
  }

  /**
   * Get the Initial Token from LocalStorage
   * Called internally by `initialToken` method
   *
   * If the `authStorageType` is `localstorage`
   * then this function is called
   * And returns the Tokens and states Stored in all 4 cookies
   *
   * @returns AuthKitStateInterface
   */
  private initialLSToken_(): AuthKitStateInterface<T> {
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
      refreshToken
    );
  }

  /**
   * Check if the Initial token is valid or not,
   * Called Internally by `initialCookieToken_()` and `initialLSToken_()`
   *
   * If the tokens are valid,
   * then it response TokenObject with auth Information
   * Else it response TokenObject with all null
   *
   * @param authToken
   * @param authTokenType
   * @param authTokenTime
   * @param stateCookie
   * @param refreshToken
   * @param refreshTokenTime
   *
   * @returns AuthKitStateInterface
   *
   */
  private checkTokenExist_(
    authToken: string | null | undefined,
    authTokenType: string | null | undefined,
    stateCookie: string | null | undefined,
    refreshToken: string | null | undefined):
    AuthKitStateInterface<T> {
    try {
      // Work on refresh first
      let refresh;
      if (this.isUsingRefreshToken && !!refreshToken) {
        // If the refresh token is tampered, then it'll stop the execution and will go at catch.
        const refreshTokenExpiresAt = this.getExpireDateTime_(refreshToken); 
        if (refreshTokenExpiresAt < new Date()){
          refresh = null;
        }
        else {
          refresh = {
            token: refreshToken,
            expiresAt: refreshTokenExpiresAt
          };
        }
      }
      else {
        refresh = null;
      }
      
      // If we are using refrsh token, but refesh is null null,
      // Then definitely we are not able to get the refersh token or the refresh token is expired. 
      // So, we'll not authenticate the user.
      // And will delete any token, if there's any
      if(this.isUsingRefreshToken && !refresh){
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
        try{
          const expiresAt = this.getExpireDateTime_(authToken);
          if(expiresAt < new Date()){    // DONE
            auth = null;
            authState = null;
          }
          else {
            authState = JSON.parse(stateCookie) as T;
            auth = {
              token: authToken,
              type: authTokenType,
              expiresAt: expiresAt,
            };
          }
        }
        catch (e) {
          auth = null;
          authState = null;
        }
      }
      else {
        auth = null;
        authState = null;
      }


      if(!!refresh){
        if(!!auth && !!authState){
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
      } else if(!this.isUsingRefreshToken && !!auth && !!authState){
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
      this.removeAllToken()
      return {
        auth: null,
        refresh: null,
        userState: null,
        isUsingRefreshToken: this.isUsingRefreshToken,
        isSignIn: false,
      };
    }
  }

  private parseJwt_(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  private getExpireDateTime_(token: string): Date {
    const jwtData = this.parseJwt_(token);
    if (jwtData.hasOwnProperty('iat')) {
      const d = new Date(0);
      d.setUTCSeconds(jwtData.iat);
      return d;
    }
    else {
      throw new AuthKitError('JWT has no iat param');
    }
  }

  /**
   * Sync Auth Tokens on time of login and logout
   *
   * Set the New Cookies or new Localstorage on login
   * Or Remove the old Cookies or old Localstorage on logout
   *
   * @param authState
   */
  private syncTokens(authState: AuthKitStateInterface<T>): void {
    if (!!authState.auth) {
      // Sync the Auth token part
      this.setAuthToken(
        authState.auth.token,
        authState.auth.type,
        authState.userState
      );
    } 
    else {
      // Remove the auth token part
      this.removeAuth();
    }

    if (!!authState.refresh && this.isUsingRefreshToken){
      // Sync the refresh part
      this.setRefreshToken(
        authState.refresh.token
      )
    }
    else {
      // Remove the refresh part
      this.removeRefresh();
    }
  }

  private setAuthToken(
    authToken: string,
    authTokenType: string,
    authState: T | null
  ):void {
    if (this.authStorageType === 'cookie') {
      const expiresAt = this.getExpireDateTime_(authToken);
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
      if (!!authState) {
        Cookies.set(this.stateStorageName, JSON.stringify(authState), {
          expires: expiresAt,
          domain: this.cookieDomain,
          secure: this.cookieSecure,
        });
      }
    }
    else{
      localStorage.setItem(this.authStorageName, authToken);
      localStorage.setItem(this.authStorageTypeName, authTokenType);
      if (!!authState) {
        localStorage.setItem(this.stateStorageName, JSON.stringify(authState));
      }
    }
  }

  private setRefreshToken(
    refreshToken: string | null
  ):void {
    if (this.authStorageType === 'cookie') {
      if (this.isUsingRefreshToken && !!this.refreshTokenName &&
        !!refreshToken) {
        const refreshTokenExpiresAt = this.getExpireDateTime_(refreshToken);
        Cookies.set(this.refreshTokenName, refreshToken, {
          expires: refreshTokenExpiresAt,
          domain: this.cookieDomain,
          secure: this.cookieSecure,
        });
      }
    }
    else{
      if (this.isUsingRefreshToken && !!this.refreshTokenName && !!refreshToken) {
        localStorage.setItem(this.refreshTokenName, refreshToken);
      }
    }
  }

  /**
   * Remove Tokens on time of Logout
   */
  private removeAllToken(): void {
    if (this.authStorageType === 'cookie') {
      this.removeAllCookieToken_();
    } else {
      this.removeAllLSToken_();
    }
  }

  /**
   * Remove Token from Cookies
   */
  private removeAllCookieToken_(): void {
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
  }

  /**
   * Remove Token from LocalStorage
   */
  private removeAllLSToken_(): void {
    localStorage.removeItem(this.authStorageName);
    localStorage.removeItem(this.authStorageTypeName);
    localStorage.removeItem(this.stateStorageName);
    if (this.isUsingRefreshToken && !!this.refreshTokenName) {
      localStorage.removeItem(this.refreshTokenName);
    }
  }

  /**
   * Remove Tokens on time of Logout
   */
  private removeAuth(): void {
    if (this.authStorageType === 'cookie') {
      this.removeAuthCookie();
    } else {
      this.removeAuthToken();
    }
  }

  /**
   * Remove Token from Cookies
   */
  private removeAuthCookie(): void {
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
  }

  /**
   * Remove Token from LocalStorage
   */
  private removeAuthToken(): void {
    localStorage.removeItem(this.authStorageName);
    localStorage.removeItem(this.authStorageTypeName);
    localStorage.removeItem(this.stateStorageName);
  }

  /**
   * Remove Tokens on time of Logout
   */
  private removeRefresh(): void {
    if (this.authStorageType === 'cookie') {
      this.removeRefreshCookie();
    } else {
      this.removeRefreshToken();
    }
  }

  /**
   * Remove Token from Cookies
   */
  private removeRefreshCookie(): void {
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
  }

  /**
   * Remove Token from LocalStorage
   */
  private removeRefreshToken(): void {
    localStorage.removeItem(this.authStorageName);
    localStorage.removeItem(this.authStorageTypeName);
    localStorage.removeItem(this.stateStorageName);
  }
}

export default TokenObject;
