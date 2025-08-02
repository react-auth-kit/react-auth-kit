/*
 * Copyright 2025 Arkadip Bhattacharya
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

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import createRefresh from 'react-auth-kit/refresh/createRefresh'
import InitialRefresh from './InitialRefresh.jsx';
import {jwt_encode} from "../util.js";

const mock = new MockAdapter(axios, {delayResponse: 2000});

mock.onPost("/refresh").reply(200, {
  "token": jwt_encode({
    "sub": "1234567890",
    "name": "John Doe",
    "exp": Math.floor(new Date()/1000) + 120
  }, "12334"),
  userState: {name: 'React Auth Kit', uid: 123456}
});

const refreshApi = createRefresh({
  interval: 10,
  initialRefreshComponent: <InitialRefresh/>,
  refreshApiCallback: async (param) => {
    console.log(param)
    try {
      const response = await axios.post("/refresh", param, {
        headers: {'Authorization': `Bearer ${param.refreshToken}`}}
      )
      return {
        isSuccess: true,
        newAuthToken: response.data.token,
        newAuthUserState: response.data.userState,
        newAuthTokenExpireIn: 10,
        newRefreshTokenExpiresIn: 60

      }
    }
    catch(error){
      console.error(error)
      return {
        isSuccess: false
      }
    }
  },
})

export default refreshApi
