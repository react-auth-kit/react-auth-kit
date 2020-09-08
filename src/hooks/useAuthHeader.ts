import { useContext } from 'react'
import { AuthContext } from '../AuthContext'

const useAuthHeader: () => () => string = () => {
  const c = useContext(AuthContext)
  return () => {
    if (c?.authState) {
      return `${c.authState.authTokenType} ${c.authState.authToken}`
    } else {
      return `Bearer `
    }
  }
}

export default useAuthHeader
