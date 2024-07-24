import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import createRefresh from 'react-auth-kit/createRefresh'
import RefreshComponent from './refreshComponent';

const mock = new MockAdapter(axios);

mock.onPost("/refresh").reply(200, {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo4MDA4NjA1MTk1fQ.ijw603AjpAqNwnUXmv6YB5L6m5aL-llIgBsTJo-k2r8"
});



const refreshApi = createRefresh({
  interval: 10,
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
