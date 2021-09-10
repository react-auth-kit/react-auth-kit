/**
 * @author Arkadip Bhattacharya <in2arkadipb13@gmail.com>
 * @fileoverview PrivateRoute component
 * @copyright Arkadip Bhattacharya 2020
 *
 * Copyright 2020 Arkadip Bhattacharya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as React from 'react';
import {Redirect, Route} from 'react-router-dom';
import AuthContext from './AuthContext';
import * as H from 'history';
import {RouteChildrenProps, RouteComponentProps} from 'react-router';
import {doSignOut} from './utils/reducers';

interface PrivateRouteProps {
  loginPath: string
  location?: H.Location;
  component?: React.ComponentType<RouteComponentProps<any>> |
    React.ComponentType<any>;
  render?: (props: RouteComponentProps<any>) => React.ReactNode;
  children?: ((props: RouteChildrenProps<any>) => React.ReactNode) |
    React.ReactNode;
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
    if (context.authState.auth) {
      if (new Date(context.authState.auth.expiresAt) > new Date()) {
        return true;
      } else {
        context.dispatch(doSignOut());
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
