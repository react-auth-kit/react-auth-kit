import { useContext } from 'react'
import { AuthContext } from '../AuthContext'
import {TokenInterface} from "../types";

/**
 * Auth State Hook
 *
 * @returns - Auth State Function
 */
const useAuth: () => () => TokenInterface = () => {
  const c = useContext(AuthContext)

  return (): TokenInterface => {
    return <TokenInterface>c?.authState.authState
  }
}

export default useAuth
