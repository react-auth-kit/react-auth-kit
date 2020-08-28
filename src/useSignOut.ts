import { useContext } from 'react'
import { AuthContext } from './AuthContext'

const useSignOut: () => () => boolean = () => {
  const c = useContext(AuthContext)
  return () => {
    try {
      if (c?.authState.authToken) {
        c.setAuthState((prevState) => ({
          ...prevState,
          authToken: null,
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
