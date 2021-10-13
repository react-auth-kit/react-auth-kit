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
import {AuthContextConsumer} from '../AuthContext';
import AuthProvider from '../AuthProvider';
import {BrowserRouter, Route} from 'react-router-dom';
import React from 'react';
import createRefresh from '../createRefresh';
import {AuthStateUserObject} from '../types';
import Cookies from 'js-cookie';

describe('AuthProvider renders successfully', ()=>{
  it('With localStorage', ()=>{
    render(
        <AuthProvider authType={'localstorage'} authName={'_auth'}>
          <BrowserRouter>
            <Route/>
          </BrowserRouter>
        </AuthProvider>,
    );
  });
  describe('With cookie', ()=>{
    it('renders with all props given', ()=>{
      render(
          <AuthProvider
            authType={'cookie'}
            authName={'_auth'}
            cookieDomain={window.location.hostname}
            cookieSecure
          >
            <BrowserRouter>
              <Route/>
            </BrowserRouter>
          </AuthProvider>,
      );
    });

    it('Throws an error, then props are missing', ()=>{
      jest.spyOn(console, 'error').mockImplementation(jest.fn());

      expect(() => render(
          <AuthProvider
            authType={'cookie'}
            authName={'_auth'}
          >
            <BrowserRouter>
              <Route/>
            </BrowserRouter>
          </AuthProvider>,
      )).toThrow();
    });
  });
});
describe('Authprovider with refresh Token', ()=> {
  afterEach(() => {
    jest.useRealTimers();
  });
  const refreshApi = createRefresh({
    interval: 1/60,
    refreshApiCallback: (param) => {
      console.log(param);
      return {
        isSuccess: true,
        newAuthToken: 'fsdgedgd',
        newAuthTokenExpireIn: 10,
        newRefreshTokenExpiresIn: 60,
      };
    },
  });

  it('renders successfully', ()=>{
    const {container} = render(
        <AuthProvider
          authType={'localstorage'}
          authName={'_hi'}
          refresh={refreshApi}
        >
          <BrowserRouter>
            <Route/>
          </BrowserRouter>
        </AuthProvider>,
    );
    expect(container.nodeName).toMatch('DIV');
  });

  it('Initially signed in', ()=>{
    jest.useFakeTimers();
    const spyRefreshApi = jest.spyOn(refreshApi, 'refreshApiCallback');

    const authToken = '__authToken';
    const authType = '__authType';
    const authTime = new Date(2021, 10, 5);
    const refreshToken = '__refreshToken';
    const refreshTime = new Date(2021, 10, 6);
    const userState = {key: 'val'} as AuthStateUserObject;

    Cookies.get = jest
        .fn()
        .mockImplementationOnce(() => authToken)
        .mockImplementationOnce(() => authType)
        .mockImplementationOnce(() => authTime)
        .mockImplementationOnce(() => JSON.stringify(userState))
        .mockImplementationOnce(() => refreshToken)
        .mockImplementationOnce(() => refreshTime);

    const TestConsumer = () => <AuthContextConsumer>{
      (value) => (
        <span>
          isSignIn: {value?.authState.isSignIn ? 'true' : 'false'}
        </span>
      )
    }</AuthContextConsumer>;

    render(
        <AuthProvider
          authType={'cookie'}
          authName={'_hi'}
          cookieDomain={window.location.hostname}
          cookieSecure={window.location.protocol === 'https:'}
          refresh={refreshApi}
        >
          <BrowserRouter>
            <TestConsumer />
            <Route/>
          </BrowserRouter>
        </AuthProvider>,
    );

    // Check if refreshApiCallback is called
    expect(spyRefreshApi).not.toBeCalled();
    jest.advanceTimersByTime(1000);

    // TODO: assertion statements needed
    expect(screen.getByText(/^isSignIn:/).textContent).toBe('isSignIn: true');

    // Check if refreshApiCallback is called
    expect(spyRefreshApi).toHaveBeenCalled();

    // Check again if refreshApiCallback is called
    jest.advanceTimersByTime(1000);
    expect(spyRefreshApi).toHaveBeenCalledTimes(2);

    jest.useRealTimers();
  });
});

export {};
