import React from 'react'
import { AuthContextConsumer } from '../AuthContext'

interface withSignInProps {
  signIn(token: string, expiresIn: number, authState: object): boolean
}

const withSignIn = <P extends object>(Component: React.ComponentType<P>) => {
  return class withSignIn extends React.Component<P & withSignInProps> {
    render() {
      const { ...props } = this.props
      return (
        <AuthContextConsumer>
          {(c) => {
            const signIn = (
              token: string,
              expiresIn: number,
              authState: object
            ): boolean => {
              const expTime = new Date(
                new Date().getTime() + expiresIn * 60 * 1000
              )
              try {
                if (c) {
                  c.setAuthState((prevState) => ({
                    ...prevState,
                    authToken: token,
                    expireAt: expTime,
                    authState: authState
                  }))
                  console.log('RAJ :: Signing In')
                  return true
                } else {
                  return false
                }
              } catch (e) {
                console.error(e)
                return false
              }
            }
            return <Component {...(props as P)} signIn={signIn} />
          }}
        </AuthContextConsumer>
      )
    }
  }
}

export default withSignIn
