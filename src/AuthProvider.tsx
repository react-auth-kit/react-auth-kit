import React, {useEffect, useState} from 'react'
import {AuthContextProvider} from './AuthContext'
import TokenObject from './TokenObject'
import {TokenInterface, TokenObjectParamsInterface,} from "./types";

interface AuthProviderProps extends TokenObjectParamsInterface {
    children: React.ReactChildren
}

/**
 * AuthProvider Functional Component
 *
 * @param children - Children Component
 * @param authCookieName - Cookie Name for Auth Storing
 * @param cookieDomain - Domain Name for the Cookies
 * @param cookieSecure - HTTP / HTTPS
 * @constructor
 */

/**
 * AuthProvider - The Authentication Context Provider
 *
 * @param children
 * @param authStorageName
 * @param authStorageType
 * @param authTimeStorageName
 * @param cookieDomain
 * @param cookieSecure
 * @param stateStorageName
 * @constructor
 */
const AuthProvider: React.FunctionComponent<AuthProviderProps> =
    ({
         children,
         authStorageType,
         authStorageName,
         authTimeStorageName,
         stateStorageName,
         cookieDomain,
         cookieSecure,
     }) => {
        if (authStorageType === "cookie" ) {
            if(!(!!cookieSecure && !!cookieDomain)){
                throw new Error("authStorageType 'cookie' requires 'cookieDomain' and 'cookieSecure' in AuthProvider")
            }
        }

        const tokenObject = new TokenObject({
            authTimeStorageName,
            authStorageType,
            authStorageName,
            cookieDomain,
            cookieSecure,
            stateStorageName
        })
        const [authState, setAuthState] = useState<TokenInterface>(
            tokenObject.initialToken()
        )

        useEffect(() => {
            tokenObject.syncTokens(authState)
        }, [authState])

        return (
            <AuthContextProvider value={{authState, setAuthState}}>
                {children}
            </AuthContextProvider>
        )
    }

    AuthProvider.defaultProps = {
        authStorageType: "cookie",
        authStorageName: "_auth_token",
        authTimeStorageName: "_auth_time",
        stateStorageName: "_auth_state",
        cookieSecure: true
    }


export default AuthProvider
