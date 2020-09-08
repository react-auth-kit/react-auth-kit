import React from 'react'
import { AuthContextConsumer } from '../AuthContext'

interface withAuthProps {
  authState: object | null
}

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  return class withAuth extends React.Component<P & withAuthProps> {
    render() {
      return (
        <AuthContextConsumer>
          {(value) => (
            <Component {...(this.props as P)} authState={value?.authState.authState} />
          )}
        </AuthContextConsumer>
      )
    }
  }
}

export default withAuth
