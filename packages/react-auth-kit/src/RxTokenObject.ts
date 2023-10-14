/**
 * 
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Token Object Engine
 * @copyright Arkadip Bhattacharya 2020
 *
 */


import Cookies from 'js-cookie';
import { BehaviorSubject } from 'rxjs';

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
  userState: T,
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

type AuthKitStateInterface<T> = AuthKitStateInterfaceTrue<T> | AuthKitStateInterfaceFalse


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
      authStorageName:string,
      authStorageType:'cookie' | 'localstorage',
      refreshTokenName:string | null,
      cookieDomain?:string,
      cookieSecure?:boolean,
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

    this.subscribe(this.syncTokens_);
  }

  subscribe(next: ((value: AuthKitStateInterface<T>) => void)) {
    this.authSubject.subscribe({
      next: next
    })
  }

  set(value: AuthKitStateInterface<T>){
    this.authSubject.next(value);
  }

  get value():  AuthKitStateInterface<T>{
    return this.authSubject.value;
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
      if (!!authToken && !!authTokenType && !!stateCookie) {
        const expiresAt = new Date(); // TODO: Purse exp datetime for JWT
        const authState: T = JSON.parse(stateCookie);
        const obj = {
          auth: {
            token: authToken,
            type: authTokenType,
            expiresAt: expiresAt,
          },
          userState: authState,
          isSignIn: true,
          isUsingRefreshToken: this.isUsingRefreshToken,
          refresh: undefined,
        };
        if (this.isUsingRefreshToken && !!refreshToken) {
          // The Refresh token is there
          const refreshTokenExpiresAt = new Date(); // TODO: Purse exp datetime for JWT
          return {
            ...obj,
            refresh: {
              token: refreshToken,
              expiresAt: refreshTokenExpiresAt,
            },
          };
        } 
        return {
          ...obj,
          refresh: null,
        };        
      }

      // The user is not authenticated.
      // Unable to get either auth token or authtokentype or state
      this.removeToken()
      return {
        auth: null,
        refresh: null,
        userState: null,
        isUsingRefreshToken: this.isUsingRefreshToken,
        isSignIn: false,
      };    
    } 
    // Error occured. So declearing as signed out
    catch (e) {
      this.removeToken()
      return {
        auth: null,
        refresh: null,
        userState: null,
        isUsingRefreshToken: this.isUsingRefreshToken,
        isSignIn: false,
      };
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
  private syncTokens_(authState: AuthKitStateInterface<T>): void {
    if (authState.auth) {
      if (this.isUsingRefreshToken && authState.refresh) {
        this.setToken(
            authState.auth.token,
            authState.auth.type,
            authState.refresh.token,
            authState.userState,
        );
      } else {
        this.setToken(
            authState.auth.token,
            authState.auth.type,
            null,
            authState.userState,
        );
      }
    } else {
      this.removeToken();
    }
  }

  /**
   * Set Cookies or localstorage on login
   *
   * @param authToken
   * @param authTokenType
   * @param refreshToken
   * @param refreshTokenExpiresAt
   * @param expiresAt
   * @param authState
   */
  private setToken(
    authToken: string,
    authTokenType: string,
    refreshToken: string | null,
    authState: T
  ): void {
    if (this.authStorageType === 'cookie') {
      const expiresAt = new Date(); // TODO: Purse exp datetime for JWT
      const refreshTokenExpiresAt = new Date(); // TODO: Purse exp datetime for JWT
      this.setCookieToken_(
          authToken,
          authTokenType,
          expiresAt,
          refreshToken,
          refreshTokenExpiresAt,
          authState);
    } else {
      this.setLSToken_(
          authToken,
          authTokenType,
          refreshToken,
          authState);
    }
  }

  /**
   *
   * Set Cookie on time of Login
   *
   * @param authToken
   * @param authTokenType
   * @param refreshToken
   * @param expiresAt
   * @param refreshTokenExpiresAt
   * @param authState
   */
  private setCookieToken_(
      authToken: string,
      authTokenType: string,
      expiresAt: Date,
      refreshToken: string | null,
      refreshTokenExpiresAt: Date | null,
      authState: T): void {
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

    if (this.isUsingRefreshToken && !!this.refreshTokenName &&
      !!refreshToken && !!refreshTokenExpiresAt ) {
      Cookies.set(this.refreshTokenName, refreshToken, {
        expires: refreshTokenExpiresAt,
        domain: this.cookieDomain,
        secure: this.cookieSecure,
      });
    }
  }

  /**
   * Set LocalStorage at the time of Login
   *
   * @param authToken
   * @param authTokenType
   * @param refreshToken
   * @param expiresAt
   * @param refreshTokenExpiresAt
   * @param authState
   */
  private setLSToken_(
    authToken: string,
    authTokenType: string,
    refreshToken: string | null,
    authState: T
  ): void {
    localStorage.setItem(this.authStorageName, authToken);
    localStorage.setItem(this.authStorageTypeName, authTokenType);
    if (authState) {
      localStorage.setItem(this.stateStorageName, JSON.stringify(authState));
    }
    if (this.isUsingRefreshToken && !!this.refreshTokenName &&
      !!refreshToken) {
      localStorage.setItem(this.refreshTokenName, refreshToken);
    }
  }

  /**
   * Remove Tokens on time of Logout
   */
  private removeToken(): void {
    if (this.authStorageType === 'cookie') {
      this.removeCookieToken_();
    } else {
      this.removeLSToken_();
    }
  }

  /**
   * Remove Token from Cookies
   */
  private removeCookieToken_(): void {
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
  private removeLSToken_(): void {
    localStorage.removeItem(this.authStorageName);
    localStorage.removeItem(this.authStorageTypeName);
    localStorage.removeItem(this.stateStorageName);
    if (this.isUsingRefreshToken && !!this.refreshTokenName) {
      localStorage.removeItem(this.refreshTokenName);
    }
  }
}

export default TokenObject;
