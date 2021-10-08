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

import {render} from '@testing-library/react';
import AuthProvider from '../AuthProvider';
import {BrowserRouter, Route} from 'react-router-dom';
import React from 'react';
import createRefresh from '../createRefresh';

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
  const refreshApi = createRefresh({
    interval: 1,
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
});

export {};
