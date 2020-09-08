import React from 'react'
import { AuthContextConsumer } from '../AuthContext'

interface withSignOutProps {
  signOut(): boolean
}

const withSignOut = <P extends object>(Component: React.ComponentType<P>) => {
  return class withSignOut extends React.Component<P & withSignOutProps> {
    render() {
      const { ...props } = this.props
      return (
        <AuthContextConsumer>
          {(c) => {
            const signOut = () => {
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
            return <Component {...(props as P)} signOut={signOut} />
          }}
        </AuthContextConsumer>
      )
    }
  }
}

export default withSignOut
