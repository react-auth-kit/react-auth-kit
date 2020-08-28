import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from './AuthContext'

type Props = {
  Component: React.ElementType
  loginPath: string
  rest: any
}

/**
 * Private Route for Components
 *
 * @remarks
 * This Component is based on {@link react-route-dom.Route}.
 * So you need to install react-route-dom before use it
 *
 * @param Component - Component to be rendered
 * @param loginPath - Fallback path if authentication fails
 * @param rest - Other props support by Route {@link react-route-dom.Route}
 */
const PrivateRoute: React.FunctionComponent<Props> = ({
  Component,
  loginPath,
  ...rest
}) => {
  const context = useContext(AuthContext)

  const isAuth = () => {
    if (context?.authState.authToken && context?.authState.expireAt) {
      if (new Date(context.authState.expireAt) > new Date()) {
        return true
      } else {
        console.log('RAJ :: Token Expired')
        context.setAuthState({
          authToken: null,
          expireAt: null,
          authState: null
        })
        return false
      }
    } else {
      return false
    }
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth() ? <Component props={props} /> : <Redirect to={loginPath} />
      }
    />
  )
}

export default PrivateRoute
