/*
 * Copyright 2021 Arkadip Bhattacharya
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

import TokenObject from '../TokenObject';

describe('isUsingRefreshToken value is as expected', ()=>{
  it('isUsingRefreshToken is false', ()=>{
    const tokenObject = new TokenObject('__', 'cookie',
        null, window.location.hostname, window.location.protocol === 'https:');

    expect(tokenObject.initialToken().isUsingRefreshToken).toBe(false);
  });

  it('isUsingRefreshToken is true', ()=>{
    const tokenObject = new TokenObject('__', 'cookie',
        '__r', window.location.hostname, window.location.protocol === 'https:');

    expect(tokenObject.initialToken().isUsingRefreshToken).toBe(true);
  });
});

describe('Token with Cookie', ()=>{
  let tokenObject: TokenObject;
  beforeEach(()=>{
    tokenObject = new TokenObject('__', 'cookie',
        null, window.location.hostname, window.location.protocol === 'https:');
  });
  it('Initially blank and signed out state', ()=>{
    const {
      isSignIn, auth, refresh} = tokenObject.initialToken();

    expect(isSignIn).toBe(false);
    expect(auth).toBe(null);
    expect(refresh).toBe(null);
  });
});

export {};
