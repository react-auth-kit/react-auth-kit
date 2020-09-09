import { useContext } from 'react'
import { AuthContext } from '../AuthProvider'
import {signInFunctionParams} from "../types";

/**
 * Authentication SignIn Hook
 *
 * @returns {function(): boolean} - Sign In function
 */
const useSignIn: () => ({token, authState, expiresIn, tokenType}: signInFunctionParams) => boolean = () => {
  const c = useContext(AuthContext)

  return ({token, authState, expiresIn, tokenType}: signInFunctionParams): boolean => {
    const expTime = new Date(new Date().getTime() + expiresIn * 60 * 1000)
    try {
      if (c) {
        c.setAuthState((prevState) => ({
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
