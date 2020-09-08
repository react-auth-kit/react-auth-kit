import React, { useEffect, useState } from 'react'
import { AuthContextProvider } from './AuthContext'
import TokenObject from './TokenObject'
import {TokenInterface} from "./types";

interface AuthProviderProps {
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
const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  children,
  authCookieName,
  authTimeCookieName,
  stateCookieName,
  cookieDomain,
  cookieSecure
}) => {
  const tokenObject = new TokenObject(
    authCookieName,
    authTimeCookieName,
    stateCookieName,
    cookieDomain,
    cookieSecure
  )
  const [authState, setAuthState] = useState<TokenInterface>(
      tokenObject.initialToken()
  )

  useEffect(() => {
      tokenObject.syncTokens(authState)
  }, [authState])

  return (
    <AuthContextProvider value={{ authState, setAuthState }}>
      {children}
    </AuthContextProvider>
  )
}

export default AuthProvider
