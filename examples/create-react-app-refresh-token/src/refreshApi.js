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


import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import createRefresh from 'react-auth-kit/createRefresh'

const mock = new MockAdapter(axios);

mock.onPost("/refresh").reply(200, {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.9QNoj7rwQgT4VEdmrV1r9dhMLESfv6nXAjU_2i3HG"
});

const RefreshComponent = () => {
  return (
    <div>
      Initial refreshing................
    </div>
  )
}

const refreshApi = createRefresh({
  interval: 0.1,
  refreshApiCallback: async (param) => {
    console.log(param)
    try {
      const response = await axios.post("/refresh", param, {
        headers: {'Authorization': `Bearer ${param.authToken}`}}
      )
      console.log("Refreshing")
      return {
        isSuccess: true,
        newAuthToken: response.data.token,
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
  initalRefreshComponent: <RefreshComponent/>
})

export default refreshApi
