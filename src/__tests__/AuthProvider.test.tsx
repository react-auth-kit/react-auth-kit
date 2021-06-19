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

describe('AuthProvider renders successfully', ()=>{
  it('1. with localStorage', ()=>{
    render(
        <AuthProvider authType={'localstorage'} authName={'_auth'}>
          <BrowserRouter>
            <Route/>
          </BrowserRouter>
        </AuthProvider>,
    );
  });
  describe('2. With Cookie', ()=>{
    it('a. with cookie but not added proper args', ()=>{
      try {
        render(
            <AuthProvider authType={'cookie'} authName={'_auth'}>
              <BrowserRouter>
                <Route/>
              </BrowserRouter>
            </AuthProvider>,
        );
      } catch (e) {
        expect(e.message).toMatch('authType \'cookie\' ' +
          'requires \'cookieDomain\' and \'cookieSecure\' props in ' +
          'AuthProvider');
      }
    });
  });
  it('3. with cookie and refreshToken', ()=>{
    render(
        <AuthProvider authType={'localstorage'} authName={'_auth'} refreshToken>
          <BrowserRouter>
            <Route/>
          </BrowserRouter>
        </AuthProvider>,
    );
  });
});

export {};
