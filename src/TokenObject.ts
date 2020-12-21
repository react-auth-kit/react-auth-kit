import Cookies from 'js-cookie';
import {TokenInterface, TokenObjectParamsInterface} from './types';

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
  private readonly refreshTokenName: string | undefined;

  /**
   * TokenObject - Stores, retrieve and process tokens
   *
   * @param authStorageName - Name of the Token, which will store the Authorization Token
   * @param authStorageType - Type of the auth Storage, `cookie` or `localstorage`
   * @param authTimeStorageName - Name of the Token,
   * which will store the Expiring time of the Authorization Token
   * @param stateStorageName - Name of the Token, which will store the User's state
   * @param refreshTokenName - Name of the refresh Token, if `undefined`, then no refreshToken feature is using
   * @param cookieDomain - domain name for the Cookies, only applicable when `authStorageType` is `cookie`
   * @param cookieSecure - cookies are secure or not, only applicable when `authStorageType` is `cookie`
   * @constructor
   */
  constructor(
    {
      authStorageName,
      authStorageType,
      authTimeStorageName,
      stateStorageName,
      refreshTokenName,
      cookieDomain,
      cookieSecure,
    }: TokenObjectParamsInterface) {
    this.authStorageType = authStorageType;
    this.authStorageName = authStorageName;
    this.authTimeStorageName = authTimeStorageName;
    this.stateStorageName = stateStorageName;
    this.refreshTokenName = refreshTokenName;
    this.cookieDomain = cookieDomain;
    this.cookieSecure = cookieSecure;
    this.authStorageTypeName = `${this.authStorageName}_type`;
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
   * @returns TokenInterface
   */
  initialToken(): TokenInterface {
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
   * @returns TokenInterface
   */
  initialCookieToken_(): TokenInterface {
    //TODO
    const authToken = Cookies.get(this.authStorageName);
    const authTokenType = Cookies.get(this.authStorageTypeName);
    const authTokenTime = Cookies.get(this.authTimeStorageName);
    const stateCookie = Cookies.get(this.stateStorageName);

    return this.checkTokenExist(
      authToken,
      authTokenType,
      authTokenTime,
      stateCookie,
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
   * @returns TokenInterface
   */
  initialLSToken_(): TokenInterface {
    //TODO
    const authToken = localStorage.getItem(this.authStorageName);
    const authTokenType = localStorage.getItem(this.authStorageTypeName);
    const authTokenTime = localStorage.getItem(this.authTimeStorageName);
    const stateCookie = localStorage.getItem(this.stateStorageName);

    return this.checkTokenExist(
      authToken,
      authTokenType,
      authTokenTime,
      stateCookie);
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
   *
   * @returns TokenInterface
   *
   */
  checkTokenExist(
    authToken: string | null | undefined,
    authTokenType: string | null | undefined,
    authTokenTime: string| null | undefined,
    stateCookie: string | null | undefined):
    TokenInterface {
    if (!!authToken && !!authTokenType && !!authTokenTime && !!stateCookie) {
      const expiresAt = new Date(authTokenTime);
      try {
        const authState = JSON.parse(stateCookie);

        return {
          authToken: authToken,
          authTokenType: authTokenType,
          // TODO
          refreshToken: "To-DO",
          expireAt: expiresAt,
          authState: authState
        };
      }catch (e) {

        return {
          authToken: null,
          authTokenType: null,
          refreshToken: null,
          expireAt: null,
          authState: null,
        };
      }
    } else {

      return {
        authToken: null,
        authTokenType: null,
        refreshToken: null,
        expireAt: null,
        authState: null,
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
  syncTokens(authState: TokenInterface) {
    //TODO
    if (
      authState.authToken === undefined ||
      authState.authTokenType === null ||
      authState.authToken === null ||
      authState.expireAt === null ||
      authState.authState === null
    ) {
      this.removeToken();
    } else {
      this.setToken(
        authState.authToken,
        authState.authTokenType,
        authState.expireAt,
        authState.authState,
      );
    }
  }

  /**
   * Set Cookies or localstorage on login
   *
   * @param authToken
   * @param authTokenType
   * @param expiresAt
   * @param authState
   */
  setToken(
    authToken: string,
    authTokenType: string,
    expiresAt: Date,
    authState: object) {
    if (this.authStorageType === 'cookie') {
      this.setCookieToken(
        authToken,
        authTokenType,
        expiresAt,
        authState);
    } else {
      this.setLSToken(
        authToken,
        authTokenType,
        expiresAt,
        authState);
    }
  }

  /**
   *
   * Set Cookie on time of Login
   *
   * @param authToken
   * @param authTokenType
   * @param expiresAt
   * @param authState
   */
  setCookieToken(
    authToken: string,
    authTokenType: string,
    expiresAt: Date,
    authState: object) {
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
    Cookies.set(this.authTimeStorageName, expiresAt, {
      expires: expiresAt,
      domain: this.cookieDomain,
      secure: this.cookieSecure,
    });
    Cookies.set(this.stateStorageName, authState, {
      expires: expiresAt,
      domain: this.cookieDomain,
      secure: this.cookieSecure,
    });
  }

  /**
   * Set LocalStorage on time of Login
   *
   * @param authToken
   * @param authTokenType
   * @param expiresAt
   * @param authState
   */
  setLSToken(
    authToken: string,
    authTokenType: string,
    expiresAt: Date,
    authState: object) {
    localStorage.setItem(this.authStorageName, authToken);
    localStorage.setItem(this.authStorageTypeName, authTokenType);
    localStorage.setItem(this.authTimeStorageName, expiresAt.toString());
    localStorage.setItem(this.stateStorageName, JSON.stringify(authState));
  }

  /**
   * Remove Tokens on time of Logout
   */
  removeToken() {
    if (this.authStorageType === 'cookie') {
      this.removeCookieToken();
    } else {
      this.removeLSToken();
    }
  }

  /**
   * Remove Token from Cookies
   */
  removeCookieToken() {
    Cookies.remove(this.authStorageName);
    Cookies.remove(this.authTimeStorageName);
    Cookies.remove(this.stateStorageName);
  }

  /**
   * Remove Token from LocalStorage
   */
  removeLSToken() {
    localStorage.removeItem(this.authStorageName);
    localStorage.removeItem(this.authTimeStorageName);
    localStorage.removeItem(this.stateStorageName);
  }

  /**
   * Checks if the current application is using the refresh token
   * By looking at the name of the `refreshTokenName` param
   *
   * If the `refreshTokenName` is not undefined, then the app is using refresh token
   *
   * @returns - True | False - If the refresh token if using by the app
   */
  isRefreshToken(){
    return this.refreshTokenName !== undefined
  }
}

export default TokenObject;
