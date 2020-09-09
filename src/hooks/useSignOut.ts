import { useContext } from 'react'
import { AuthContext } from '../AuthProvider'

const useSignOut: () => () => boolean = () => {
  const c = useContext(AuthContext)
  return () => {
    try {
      if (c?.authState.authToken) {
        c.setAuthState((prevState) => ({
          ...prevState,
          authToken: null,
          authTokenType: null,
          expireAt: null,
          authState: null
        }))
        console.log('RAJ :: Signing Out')
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }
}

export default useSignOut
