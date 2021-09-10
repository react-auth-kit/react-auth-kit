import Cookies from 'js-cookie';
import {AuthKitStateInterface, AuthStateUserObject} from './types';

/**
 * @class TokenObject
 *
 * Stores and retrieve Token
 */
class TokenObject {
  private readonly authStorageName: string
  private readonly stateStorageName: string
  private readonly authTimeStorageName: string
  private readonly cookieDomain?: string
  private readonly cookieSecure?: boolean
  private readonly authStorageTypeName: string;
  private readonly authStorageType: 'cookie' | 'localstorage';
  private readonly refreshTokenName: string | null;
  private readonly refreshTokenTimeName: string | null;
  private readonly isUsingRefreshToken: boolean;

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
    this.authStorageType = authStorageType;
    this.authStorageName = authStorageName;
    this.authTimeStorageName = `${authStorageName}_storage`;
    this.stateStorageName = `${authStorageName}_state`;
    this.refreshTokenName = refreshTokenName;
    this.cookieDomain = cookieDomain;
    this.cookieSecure = cookieSecure;
    this.authStorageTypeName = `${this.authStorageName}_type`;
    this.isUsingRefreshToken = !!this.refreshTokenName;
    this.refreshTokenTimeName = this.refreshTokenName ?
      `${this.refreshTokenName}_time` : null;
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
  initialToken(): AuthKitStateInterface {
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
  initialCookieToken_(): AuthKitStateInterface {
    const authToken = Cookies.get(this.authStorageName);
    const authTokenType = Cookies.get(this.authStorageTypeName);
    const authTokenTime = Cookies.get(this.authTimeStorageName);
    const stateCookie = Cookies.get(this.stateStorageName);

    const refreshToken = this.isUsingRefreshToken &&
    this.refreshTokenName != null ? Cookies.get(this.refreshTokenName) : null;

    const refreshTokenTime = this.isUsingRefreshToken &&
    this.refreshTokenTimeName != null ?
      Cookies.get(this.refreshTokenTimeName) : null;

    return this.checkTokenExist(
        authToken,
        authTokenType,
        authTokenTime,
        stateCookie,
        refreshToken,
        refreshTokenTime);
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
  initialLSToken_(): AuthKitStateInterface {
    const authToken = localStorage.getItem(this.authStorageName);
    const authTokenType = localStorage.getItem(this.authStorageTypeName);
    const authTokenTime = localStorage.getItem(this.authTimeStorageName);
    const stateCookie = localStorage.getItem(this.stateStorageName);

    const refreshToken = this.isUsingRefreshToken &&
    this.refreshTokenName != null ?
      localStorage.getItem(this.refreshTokenName) : null;

    const refreshTokenTime = this.isUsingRefreshToken &&
    this.refreshTokenTimeName != null ?
      localStorage.getItem(this.refreshTokenTimeName) : null;

    return this.checkTokenExist(
        authToken,
        authTokenType,
        authTokenTime,
        stateCookie,
        refreshToken,
        refreshTokenTime);
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
  checkTokenExist(
      authToken: string | null | undefined,
      authTokenType: string | null | undefined,
      authTokenTime: string | null | undefined,
      stateCookie: string | null | undefined,
      refreshToken: string | null | undefined,
      refreshTokenTime: string | null | undefined):
    AuthKitStateInterface {
    if (!!authToken && !!authTokenType && !!authTokenTime && !!stateCookie) {
      const expiresAt = new Date(authTokenTime);
      try {
        const authState = JSON.parse(stateCookie);
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
        if (this.isUsingRefreshToken && !!refreshToken && !! refreshTokenTime) {
          const refreshTokenExpiresAt = new Date(refreshTokenTime);
          return {
            ...obj,
            refresh: {
              token: refreshToken,
              expiresAt: refreshTokenExpiresAt,
            },
          };
        } else {
          return {
            ...obj,
            refresh: null,
          };
        }
      } catch (e) {
        return {
          auth: null,
          refresh: null,
          userState: null,
          isUsingRefreshToken: this.isUsingRefreshToken,
          isSignIn: false,
        };
      }
    } else {
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
  syncTokens(authState: AuthKitStateInterface): void {
    if (authState.auth) {
      if (this.isUsingRefreshToken && authState.refresh) {
        this.setToken(
            authState.auth.token,
            authState.auth.type,
            authState.refresh.token,
            authState.refresh.expiresAt,
            authState.auth.expiresAt,
            authState.userState,
        );
      } else {
        this.setToken(
            authState.auth.token,
            authState.auth.type,
            null,
            null,
            authState.auth.expiresAt,
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
  setToken(
      authToken: string,
      authTokenType: string,
      refreshToken: string | null,
      refreshTokenExpiresAt: Date | null,
      expiresAt: Date,
      authState: AuthStateUserObject|null): void {
    if (this.authStorageType === 'cookie') {
      this.setCookieToken_(
          authToken,
          authTokenType,
          refreshToken,
          expiresAt,
          refreshTokenExpiresAt,
          authState);
    } else {
      this.setLSToken_(
          authToken,
          authTokenType,
          refreshToken,
          expiresAt,
          refreshTokenExpiresAt,
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
  setCookieToken_(
      authToken: string,
      authTokenType: string,
      refreshToken: string | null,
      expiresAt: Date,
      refreshTokenExpiresAt: Date | null,
      authState: AuthStateUserObject|null): void {
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
    Cookies.set(this.authTimeStorageName, expiresAt.toISOString(), {
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
      !!refreshToken) {
      Cookies.set(this.refreshTokenName, refreshToken, {
        expires: expiresAt,
        domain: this.cookieDomain,
        secure: this.cookieSecure,
      });
    }

    if (this.isUsingRefreshToken && !!this.refreshTokenTimeName &&
      !!refreshTokenExpiresAt) {
      Cookies.set(this.refreshTokenTimeName,
          refreshTokenExpiresAt.toISOString(), {
            expires: expiresAt,
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
  setLSToken_(
      authToken: string,
      authTokenType: string,
      refreshToken: string | null,
      expiresAt: Date,
      refreshTokenExpiresAt: Date | null,
      authState: AuthStateUserObject|null): void {
    localStorage.setItem(this.authStorageName, authToken);
    localStorage.setItem(this.authStorageTypeName, authTokenType);
    localStorage.setItem(this.authTimeStorageName, expiresAt.toISOString());
    if (authState) {
      localStorage.setItem(this.stateStorageName, JSON.stringify(authState));
    }
    if (this.isUsingRefreshToken && !!this.refreshTokenName &&
      !!refreshToken) {
      localStorage.setItem(this.refreshTokenName, refreshToken);
    }
    if (this.isUsingRefreshToken && !!this.refreshTokenTimeName &&
      !!refreshTokenExpiresAt) {
      localStorage.setItem(this.refreshTokenTimeName,
          refreshTokenExpiresAt.toISOString());
    }
  }

  /**
   * Remove Tokens on time of Logout
   */
  removeToken(): void {
    if (this.authStorageType === 'cookie') {
      this.removeCookieToken_();
    } else {
      this.removeLSToken_();
    }
  }

  /**
   * Remove Token from Cookies
   */
  removeCookieToken_(): void {
    Cookies.remove(this.authStorageName, {
      domain: this.cookieDomain,
      secure: this.cookieSecure,
    });
    Cookies.remove(this.authTimeStorageName, {
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
    if (this.isUsingRefreshToken && !!this.refreshTokenTimeName) {
      Cookies.remove(this.refreshTokenTimeName, {
        domain: this.cookieDomain,
        secure: this.cookieSecure,
      });
    }
  }

  /**
   * Remove Token from LocalStorage
   */
  removeLSToken_(): void {
    localStorage.removeItem(this.authStorageName);
    localStorage.removeItem(this.authTimeStorageName);
    localStorage.removeItem(this.authStorageTypeName);
    localStorage.removeItem(this.stateStorageName);
    if (this.isUsingRefreshToken && !!this.refreshTokenName) {
      localStorage.removeItem(this.refreshTokenName);
    }
    if (this.isUsingRefreshToken && !!this.refreshTokenTimeName) {
      localStorage.removeItem(this.refreshTokenTimeName);
    }
  }
}

export default TokenObject;
