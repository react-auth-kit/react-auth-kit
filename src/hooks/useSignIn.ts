import * as React from 'react'
import { AuthContext } from '../AuthProvider'
import {signInFunctionParams} from "../types";

/**
 * Authentication SignIn Hook
 *
 * @returns - Sign In function
 */
function useSignIn ():(signInConfig: signInFunctionParams) => boolean {
    const context = React.useContext(AuthContext)

    return (signInConfig: signInFunctionParams): boolean => {
        const {token, tokenType, authState, expiresIn} = signInConfig
        const expTime = new Date(new Date().getTime() + expiresIn * 60 * 1000)
        try {
            if (context) {
                context.setAuthState((prevState) => ({
                    ...prevState,
                    authToken: token,
                    authTokenType: tokenType,
                    expireAt: expTime,
                    authState: authState
                }))
                return true
            } else {
                return false
            }
        } catch (e) {
            console.error(e)
            return false
        }
    }
}
export default useSignIn
