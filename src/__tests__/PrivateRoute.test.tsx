/*
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
import {render, screen} from '@testing-library/react';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthProvider from '../AuthProvider';
import AuthContext from '../AuthContext';
import {AuthKitStateInterface} from '../types';
import {doSignOut} from '../utils/reducers';
import RequireAuth from '../PrivateRoute';

// Helpers
const getPastDate = () => new Date(new Date().getTime() - 1000);
const getFutureDate = () => new Date(new Date().getTime() + 1000);
const getFakeContextValue = (expiresAt: Date, dispatch = jest.fn()) => {
  const authState: AuthKitStateInterface = {
    auth: {
      token: 'fake-token',
      type: 'cookie',
      expiresAt,
    },
    refresh: null,
    userState: null,
    isSignIn: false,
    isUsingRefreshToken: false,
  };

  return {
    authState,
    dispatch,
  };
};

describe('PrivateRoute component', () => {
  it('renders successfully with AuthProvider', () => {
    const {container} = render(
        <AuthProvider authType={'cookie'} authName={'_Hi'}
          cookieDomain={window.location.hostname}>
          <BrowserRouter>
            <Routes>
              <Route path={'/login'}/>
              <Route path={'/'}/>
              <Route element={
                <RequireAuth loginPath={'/login'}>
                  <div>
                    Protected
                  </div>
                </RequireAuth>
              }/>
            </Routes>
          </BrowserRouter>
        </AuthProvider>,
    );
    expect(container.nodeName).toMatch('DIV');
  });

  it('throws, when used outside AuthProvider', () => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn());

    expect(() => render(
        <BrowserRouter>
          <Routes>
            <Route path={'/login'}/>
            <Route path={'/'} element={
              <RequireAuth loginPath={'/login'}>
                <div>
                Protected
                </div>
              </RequireAuth>
            }/>
          </Routes>
        </BrowserRouter>,
    )).toThrow();
  });

  it('renders component, when the token has not yet expired', () => {
    const TestComponent = () => <p>Test Component</p>;
    const fakeContextValue = getFakeContextValue(getFutureDate());

    render(
        <AuthContext.Provider value={fakeContextValue}>
          <BrowserRouter>
            <Routes>
              <Route path={'/login'}/>
              <Route path={'/'} element={
                <RequireAuth loginPath={'/login'}>
                  <div>
                    <TestComponent/>
                  </div>
                </RequireAuth>
              }/>
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>,
    );

    expect(screen.getByText(/test component/i)).toBeTruthy();
  });

  it('dispatches "doSignOut" action, when the token has expired', () => {
    const TestComponent = () => <p>Test Component</p>;
    const fakeDispatch = jest.fn();
    const fakeContextValue = getFakeContextValue(getPastDate(), fakeDispatch);

    render(
        <AuthContext.Provider value={fakeContextValue}>
          <BrowserRouter>
            <Routes>
              <Route path={'/login'} element={
                <div>
                  Login
                </div>
              }/>
              <Route path={'/'} element={
                <RequireAuth loginPath={'/login'}>
                  <div>
                    <TestComponent/>
                  </div>
                </RequireAuth>
              }/>
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>,
    );

    expect(fakeDispatch).toHaveBeenCalled();
    expect(fakeDispatch).toHaveBeenCalledWith(doSignOut());
  });

  it('renders nothing, missing both "component" and "render" props', () => {
    const fakeDispatch = jest.fn();
    const fakeContextValue = getFakeContextValue(getFutureDate(), fakeDispatch);

    render(
        <AuthContext.Provider value={fakeContextValue}>
          <BrowserRouter>
            <div data-testid={'parent'}>
              <Routes>
                <Route path={'/login'}/>
                <Route path={'/'} element={
                  <RequireAuth loginPath={'/login'}>
                    <div>
                        Protected
                    </div>
                  </RequireAuth>
                }/>
              </Routes>
            </div>
          </BrowserRouter>
        </AuthContext.Provider>,
    );

    expect(fakeDispatch).not.toHaveBeenCalled();
    expect(screen.getByTestId('parent').hasChildNodes()).toBe(false);
  });
});

export {};
