import React, {useContext} from 'react'
import {Route, Redirect, RouteProps} from 'react-router-dom'
import {AuthContext} from './AuthProvider'

interface PrivateRouteProps extends RouteProps {
    loginPath: string
}

/**
 * Private Route for Components
 *
 * @remarks
 * This Component is based on {@link https://reactrouter.com/web/api/Route | reactrouter.Route}.
 * So you need to install react-route-dom before use it
 *
 * @param props
 */
const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = (props) => {
    const context = useContext(AuthContext)

    const isAuth = () => {
        if (context?.authState.authToken && context?.authState.expireAt) {
            if (new Date(context.authState.expireAt) > new Date()) {
                return true
            } else {
                context.setAuthState({
                    authToken: null,
                    authTokenType: null,
                    expireAt: null,
                    authState: null
                })
                return false
            }
        } else {
            return false
        }
    }

    const {component, loginPath, strict, sensitive, exact, path, location, render} = props

    return (
        <Route
            location={location}
            path={path}
            exact={exact}
            sensitive={sensitive}
            strict={strict}
            render={(renderProps) =>
                isAuth() ?
                    component
                        ? React.createElement(component, renderProps)
                        : render
                        ? render(renderProps)
                        : null
                    : <Redirect to={loginPath}/>
            }
        />
    )
}

export default PrivateRoute
