import Cookies from 'js-cookie'
import {TokenInterface} from "./types";

class TokenObject {
    private readonly authCookieName: string
    private readonly stateCookieName: string
    private readonly authTimeCookieName: string
    private readonly cookieDomain: string
    private readonly cookieSecure: boolean
    private readonly authCookieTypeName: string;

    constructor(
        authCookieName: string,
        authTimeCookieName: string,
        stateCookieName: string,
        cookieDomain: string,
        cookieSecure: boolean
    ) {
        this.authCookieName = authCookieName
        this.authTimeCookieName = authTimeCookieName
        this.stateCookieName = stateCookieName
        this.cookieDomain = cookieDomain
        this.cookieSecure = cookieSecure
        this.authCookieTypeName = `${this.authCookieName}_type`
    }

    setToken(authToken: string, authTokenType: string, expiresAt: Date, authState: object) {
        Cookies.set(this.authCookieName, authToken, {
            expires: expiresAt,
            domain: this.cookieDomain,
            secure: this.cookieSecure
        })
        Cookies.set(this.authCookieTypeName, authTokenType, {
            expires: expiresAt,
            domain: this.cookieDomain,
            secure: this.cookieSecure
        })
        Cookies.set(this.authTimeCookieName, expiresAt, {
            expires: expiresAt,
            domain: this.cookieDomain,
            secure: this.cookieSecure
        })
        Cookies.set(this.stateCookieName, authState, {
            expires: expiresAt,
            domain: this.cookieDomain,
            secure: this.cookieSecure
        })
    }

    removeToken() {
        Cookies.remove(this.authCookieName)
        Cookies.remove(this.authTimeCookieName)
        Cookies.remove(this.stateCookieName)
    }

    initialToken(): TokenInterface {
        const authCookie = Cookies.get(this.authCookieName)
        const authCookieType = Cookies.get(this.authCookieTypeName)
        const authTimeCookie = Cookies.get(this.authTimeCookieName)
        const stateCookie = Cookies.get(this.stateCookieName)

        if (authCookie !== undefined && authTimeCookie !== undefined && authCookieType !== undefined) {
            const token = authCookie
            const expiresAt = new Date(authTimeCookie)
            let authState
            try {
                authState = stateCookie !== undefined ? JSON.parse(stateCookie) : ''
            } catch (e) {
                authState = ''
            }
            return {authToken: token, authTokenType: authCookieType, expireAt: expiresAt, authState: authState}
        } else {
            return {authToken: null, authTokenType: null, expireAt: null, authState: null}
        }
    }

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
}

export default TokenObject
