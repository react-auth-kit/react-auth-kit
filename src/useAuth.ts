import { useContext } from 'react'
import { AuthContext } from './AuthContext'

declare interface TokenInterface {
  authToken: authTokenType
  expireAt: Date | null
  authState: object | null
}

/**
 * Auth State Hook
 *
 * @returns - Auth State Function
 */
const useAuth: () => () => TokenInterface = () => {
  const c = useContext(AuthContext)

  return (): TokenInterface => {
    return <TokenInterface>c?.authState
  }
}

export default useAuth
