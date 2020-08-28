import React, { useEffect, useState } from 'react'
import { AuthContextProvider } from './AuthContext'
import TokenObject from './TokenObject'

type authTokenType = string | null

declare interface TokenInterface {
  authToken: authTokenType
  expireAt: Date | null
  authState: object | null
}

interface AuthProps {
  authCookieName: string
  authTimeCookieName: string
  stateCookieName: string
  cookieDomain: string
  cookieSecure: boolean
  children: React.ReactChildren
}

/**
 * AuthProvider Functional Component
 *
 * @param children - Children Component
 * @param authCookieName - Cookie Name for Auth Storing
 * @param authTimeCookieName - Cookie name for Auth Time Storing
 * @param stateCookieName - Cookie name for Auth User Data Storing
 * @param cookieDomain - Domain Name for the Cookies
 * @param cookieSecure - HTTP / HTTPS
 * @constructor
 */
const AuthProvider: React.FunctionComponent<AuthProps> = ({
  children,
  authCookieName,
  authTimeCookieName,
  stateCookieName,
  cookieDomain,
  cookieSecure
}) => {
  const JwtTokenObject = new TokenObject(
    authCookieName,
    authTimeCookieName,
    stateCookieName,
    cookieDomain,
    cookieSecure
  )
  const [authState, setAuthState] = useState<TokenInterface>(
    JwtTokenObject.initialToken()
  )

  useEffect(() => {
    JwtTokenObject.syncTokens(authState)
  }, [authState])

  return (
    <AuthContextProvider value={{ authState, setAuthState }}>
      {children}
    </AuthContextProvider>
  )
}

export default AuthProvider
