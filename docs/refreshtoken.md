# Refresh Tokens

Often JWT comes with a new challenge.
You have to `refresh` the JWT token periodically using a token, named Refresh token.

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" data-ea-keywords="web|react|javascript|python|database|node|mongo" id="refresh"></div>

> A refresh token is a special kind of token used to obtain a renewed access token.
You can request new access tokens until the refresh token is on the DenyList.
Applications must store refresh tokens securely because they essentially allow a user to remain authenticated forever.

React Auth Kit implements an easy approach to integrate the refresh token.

You can either use the refresh token in your application or you can leave it.

---

## API Builder

To build the refresh token API, you have to use `createRefresh` function.
It is an identity function. It is mainly used for typechecking and mobility.

### createRefresh

`#!js createRefresh(options) => refreshApi`

Generate a refreshApi based on the options received

#### Arguments

`options` (object): Takes a refresh object. It has 2 parameters

1. `refreshApiCallback` (function): This is an API function. Inside this function, you have to add a network request API. See the [details](#refreshapicallback)
2. `interval` (number): The time interval in minutes, by which the `refreshApiCallback` is called and the state is updated

#### Returns

A complete object of refresh token API. Add this object in the `AuthProvider` as a prop to implement the feature.

```js
import {createRefresh} from 'react-auth-kit'

const refreshApi = createRefresh({
  interval: 10, // Refreshs the token in every 10 minutes
  refreshApiCallback: param => {  // API container function
    return {
      isSuccess: true,
    }
  }
})

export default refreshApi
```

---

### refreshApiCallback

The container for refresh API

#### Arguments

The function has only one argument, which is the `object` of the latest state.

The object contains:

1. `authToken` (string): The Auth token
2. `authTokenExpireAt` (Date) : Expiring time of the Auth token
3. `refreshToken` (string): The Refresh token
4. `refreshTokenExpiresAt` (Date): Expiring time of the refresh token
5. `authUserState` (object): The current User state

#### Returns

In side the function you have to return an `object` of new auth state fetched by the API.

The return object must contain:

1. `isSuccess` (boolean): If the network request is successful, then make it `true`, otherwise make it false.
   If the value of this variable is false then the state will not changed, and it'll wait for the next time
2. `newAuthToken` (string): The value of this variable will be the new auth token. So pass the new auth token here.
3. `newAuthTokenExpireIn` (number)(optional): New time limit in minutes, after which the auth token will expire.
   If you leave it, the old time limit will not be changed. So if you want to add more 10 minutes, then pass 10 here.
4. `newRefreshToken` (string)(optional): Pass the new refresh token here, if you want to refresh the refresh token itself.
5. `newRefreshTokenExpiresIn` (number)(optional): New time limit in minutes, after which the refresh token will expire. Works same as `newAuthTokenExpireIn`
6. `newAuthUserState` (object)(optional): Pass the new user state. If your API updates the user state, then use this, else leave it.

#### refreshApiCallback Example

```js
{refreshApiCallback: (
    {   // arguments
      authToken,
      authTokenExpireAt,
      refreshToken,
      refreshTokenExpiresAt,
      authUserState
    }) => {
    axios.post('/api/refresh',
      {
        refreshToken: refreshToken,
        oldAuthToken: authToken
      }
    ).then(({data})=>{
      return {
        // As the request is successful, we are passing new tokens.
        isSuccess: true,  // For successful network request isSuccess is true
        newAuthToken: data.newAuthToken,
        newAuthTokenExpireIn: data.newAuthTokenExpireIn
        // You can also add new refresh token ad new user state
      }
    }).catch((e)=>{
      console.error(e)
      return{
        // As the request is unsuccessful, we are just passing the isSuccess.
        isSuccess:false // For unsuccessful network request isSuccess is false
      }
    })
  }
}
```

---

### API Builder Example

This is the overall example of how to use `createRefresh`. The example uses axios to make network request.

```js
import axios from 'axios'
import {useAuthHeader, createRefresh} from 'react-auth-kit'

const refreshApi = createRefresh({
  interval: 10,   // Refreshs the token in every 10 minutes
  refreshApiCallback: (
    {
      authToken,
      authTokenExpireAt,
      refreshToken,
      refreshTokenExpiresAt,
      authUserState
    }) => {
    axios.post('/api/refresh',
      {
        refreshToken: refreshToken,
        oldAuthToken: authToken
      }
    ).then(({data})=>{
      return {
        isSuccess: true,  // For successful network request isSuccess is true
        newAuthToken: data.newAuthToken,
        newAuthTokenExpireIn: data.newAuthTokenExpireIn
        // You can also add new refresh token ad new user state
      }
    }).catch((e)=>{
      console.error(e)
      return{
        isSuccess:false // For unsuccessful network request isSuccess is false
      }
    })
  }
})

export default refreshApi
```

## Integration in Auth Provider

To add the refresh token feature, simply add the return value of `createRefresh` function in the `AuthProvider` as a prop.

```js
import {AuthProvider} from 'react-auth-kit'
import refreshApi from "./refreshApi";

function App() {
  return (
    <AuthProvider
      authName={"_auth"}
      authType={"cookie"}
      refresh={refreshApi}
    >
      <Routes/>
    </AuthProvider>
  );
}
```

!!! warning "Only use the return from createRefresh as the prop value"

    Using values other than the return of `createRefresh` will cause the application to break.
    So only use the return of `createRefresh` as the prop value.

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">Apache 2.0 License</a> code</i></p>
