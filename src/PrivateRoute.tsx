import * as React from 'react';
import {Redirect, Route} from 'react-router-dom';
import AuthContext from './AuthContext';
import * as H from "history";
import {RouteChildrenProps, RouteComponentProps} from "react-router";

interface PrivateRouteProps {
  loginPath: string
  location?: H.Location;
  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  render?: (props: RouteComponentProps<any>) => React.ReactNode;
  children?: ((props: RouteChildrenProps<any>) => React.ReactNode) | React.ReactNode;
  path?: string | string[];
  exact?: boolean;
  sensitive?: boolean;
  strict?: boolean;
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
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new
    Error('Auth Provider is missing. ' +
      'Please add the AuthProvider before Router');
  }

  const isAuth = () => {
    if (context.authState.authToken && context.authState.expireAt) {
      if (new Date(context.authState.expireAt) > new Date()) {
        return true;
      } else {
        context.setAuthState((prevState) => ({
          ...prevState,
          authToken: null,
          authTokenType: null,
          expireAt: null,
          authState: null,
          refreshToken: null,
          refreshTokenExpireAt: null,
        }));
        return false;
      }
    } else {
      return false;
    }
  };

  const {
    component,
    loginPath,
    strict,
    sensitive,
    exact,
    path,
    location,
    render,
  } = props;

  return (
    <Route
      location={location}
      path={path}
      exact={exact}
      sensitive={sensitive}
      strict={strict}
      render={(renderProps) =>
        isAuth() ?
          component ?
            React.createElement(component, renderProps) :
            render ?
              render(renderProps) :
              null :
          <Redirect to={loginPath}/>
      }
    />
  );
};

export default PrivateRoute;
