import Cookies from 'js-cookie'
import {TokenInterface, TokenObjectParamsInterface} from "./types";

class TokenObject {
    private readonly authStorageName: string
    private readonly stateStorageName: string
    private readonly authTimeStorageName: string
    private readonly cookieDomain?: string
    private readonly cookieSecure?: boolean
    private readonly authStorageTypeName: string;
    private readonly authStorageType: "cookie" | "localstorage";

    /**
     * TokenObject - Stores, retrieve and process tokens
     *
     * @param authStorageName
     * @param authStorageType
     * @param authTimeStorageName
     * @param stateStorageName
     * @param cookieDomain
     * @param cookieSecure
     * @constructor
     */
    constructor({authStorageName, authStorageType, authTimeStorageName, stateStorageName, cookieDomain, cookieSecure}: TokenObjectParamsInterface) {
        this.authStorageType = authStorageType
        this.authStorageName = authStorageName
        this.authTimeStorageName = authTimeStorageName
        this.stateStorageName = stateStorageName
        this.cookieDomain = cookieDomain
        this.cookieSecure = cookieSecure
        this.authStorageTypeName = `${this.authStorageName}_type`
    }

    /**
     * Get the Initial Token
     *
     * @returns TokenInterface
     */
    initialToken(): TokenInterface {
        if (this.authStorageType === "cookie") {
            return this.initialCookieToken()
        } else {
            return this.initialLSToken()
        }
    }

    /**
     * Get the Initial Token from Cookie
     * If the React App uses Cookie for storing Auth info, this Function is called
     *
     * Called from this.initialToken
     *
     * @returns TokenInterface
     */
    initialCookieToken(): TokenInterface {
        const authToken = Cookies.get(this.authStorageName)
        const authTokenType = Cookies.get(this.authStorageTypeName)
        const authTokenTime = Cookies.get(this.authTimeStorageName)
        const stateCookie = Cookies.get(this.stateStorageName)

        return this.checkTokenExist(authToken, authTokenType, authTokenTime, stateCookie)
    }

    /**
     * Get the Initial Token from LocalStorage
     * If the React App uses LocalStorage for storing Auth info, this Function is called
     *
     * Called from this.initialToken
     *
     * @returns TokenInterface
     */
    initialLSToken(): TokenInterface {
        const authToken = localStorage.getItem(this.authStorageName)
        const authTokenType = localStorage.getItem(this.authStorageTypeName)
        const authTokenTime = localStorage.getItem(this.authTimeStorageName)
        const stateCookie = localStorage.getItem(this.stateStorageName)

        return this.checkTokenExist(authToken, authTokenType, authTokenTime, stateCookie)
    }

    /**
     * Check if the Initial token is valid or not,
     *
     * If the tokens are valid, then it response TokenObject with auth Information
     * Else it response TokenObject with null
     *
     * @param authToken
     * @param authTokenType
     * @param authTokenTime
     * @param stateCookie
     *
     * @returns TokenInterface
     *
     */
    checkTokenExist (authToken: string | null | undefined,
                     authTokenType: string | null | undefined,
                     authTokenTime: string| null | undefined,
                     stateCookie: string | null | undefined):TokenInterface {
        if (!!authToken && !!authTokenType && !!authTokenTime && !!stateCookie){
            const expiresAt = new Date(authTokenTime)
            try {
                const authState = JSON.parse(stateCookie)
                return {authToken: authToken, authTokenType: authTokenType, expireAt: expiresAt, authState: authState}
            } catch (e) {
                return {authToken: null, authTokenType: null, expireAt: null, authState: null}
            }
        } else {
            return {authToken: null, authTokenType: null, expireAt: null, authState: null}
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
        if (
            authState.authToken === undefined ||
            authState.authTokenType === null ||
            authState.authToken === null ||
            authState.expireAt === null ||
            authState.authState === null
        ) {
            this.removeToken()
        } else {
            this.setToken(
                authState.authToken,
                authState.authTokenType,
                authState.expireAt,
                authState.authState
            )
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
    setToken(authToken: string, authTokenType: string, expiresAt: Date, authState: object) {
        if (this.authStorageType === "cookie"){
            this.setCookieToken(authToken, authTokenType, expiresAt, authState)
        } else {
            this.setLSToken(authToken, authTokenType, expiresAt, authState)
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
    setCookieToken(authToken: string, authTokenType: string, expiresAt: Date, authState: object) {
        Cookies.set(this.authStorageName, authToken, {
            expires: expiresAt,
            domain: this.cookieDomain,
            secure: this.cookieSecure
        })
        Cookies.set(this.authStorageTypeName, authTokenType, {
            expires: expiresAt,
            domain: this.cookieDomain,
            secure: this.cookieSecure
        })
        Cookies.set(this.authTimeStorageName, expiresAt, {
            expires: expiresAt,
            domain: this.cookieDomain,
            secure: this.cookieSecure
        })
        Cookies.set(this.stateStorageName, authState, {
            expires: expiresAt,
            domain: this.cookieDomain,
            secure: this.cookieSecure
        })
    }

    /**
     * Set LocalStorage on time of Login
     *
     * @param authToken
     * @param authTokenType
     * @param expiresAt
     * @param authState
     */
    setLSToken(authToken: string, authTokenType: string, expiresAt: Date, authState: object) {
        localStorage.setItem(this.authStorageName, authToken)
        localStorage.setItem(this.authStorageTypeName, authTokenType)
        localStorage.setItem(this.authTimeStorageName, expiresAt.toString())
        localStorage.setItem(this.stateStorageName, JSON.stringify(authState))
    }

    /**
     * Remove Tokens on time of Logout
     */
    removeToken() {
        if (this.authStorageType === "cookie"){
            this.removeCookieToken()
        } else {
            this.removeLSToken()
        }
    }

    /**
     * Remove Token from Cookies
     */
    removeCookieToken() {
        Cookies.remove(this.authStorageName)
        Cookies.remove(this.authTimeStorageName)
        Cookies.remove(this.stateStorageName)
    }

    /**
     * Remove Token from LocalStorage
     */
    removeLSToken() {
        localStorage.removeItem(this.authStorageName)
        localStorage.removeItem(this.authTimeStorageName)
        localStorage.removeItem(this.stateStorageName)
    }
}

export default TokenObject
