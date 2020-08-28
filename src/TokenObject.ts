import Cookies from 'js-cookie'

class TokenObject {
  private readonly authCookieName: string
  private readonly stateCookieName: string
  private readonly authTimeCookieName: string
  private readonly cookieDomain: string
  private readonly cookieSecure: boolean

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
  }

  setToken(authToken: string, expiresAt: Date, authState: object) {
    Cookies.set(this.authCookieName, authToken, {
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
    const authTimeCookie = Cookies.get(this.authTimeCookieName)
    const stateCookie = Cookies.get(this.stateCookieName)

    if (authCookie !== undefined && authTimeCookie !== undefined) {
      const token = authCookie
      const expiresAt = new Date(authTimeCookie)
      let authState
      try {
        authState = stateCookie !== undefined ? JSON.parse(stateCookie) : ''
      } catch (e) {
        authState = ''
      }
      return { authToken: token, expireAt: expiresAt, authState: authState }
    } else {
      return { authToken: null, expireAt: null, authState: null }
    }
  }

  syncTokens(authState: TokenInterface) {
    if (
      authState.authToken === undefined ||
      authState.authToken === null ||
      authState.expireAt === null ||
      authState.authState === null
    ) {
      this.removeToken()
    } else {
      this.setToken(
        authState.authToken,
        authState.expireAt,
        authState.authState
      )
    }
  }
}

export default TokenObject
