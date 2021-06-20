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
import React from 'react';
import PrivateRoute from '../PrivateRoute';
import {BrowserRouter} from 'react-router-dom';
import AuthProvider from '../AuthProvider';

test('Private Route without AuthProvider throws an errors', ()=>{
  try {
    render(
        <BrowserRouter>
          <PrivateRoute loginPath={'/login'} />
        </BrowserRouter>,
    );
  } catch (e) {
    expect(e.message).toBe('Auth Provider is missing. ' +
      'Please add the AuthProvider before Router');
  }
});

test('PrivateRoute renders successfully with AuthProvider', ()=>{
  const {container} = render(
      <AuthProvider authType={'cookie'} authName={'_Hi'}
        cookieDomain={window.location.hostname}>
        <BrowserRouter>
          <PrivateRoute loginPath={'/login'}/>
        </BrowserRouter>
      </AuthProvider>,
  );
  expect(container.nodeName).toMatch('DIV');
});

export {};
