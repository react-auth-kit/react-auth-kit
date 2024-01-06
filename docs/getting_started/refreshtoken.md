---
title: Refresh Token - React Auth Kit
description: Refresh the auth token in the background by using the Refresh token feature. Just use the createRefresh builder.
---


# Refresh the Access token using Refresh Token :material-refresh:

Often JWT comes with a new challenge.
You have to `refresh` the JWT token periodically using a token, named Refresh token.

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" id="refresh"></div>

> A refresh token is a special kind of token used to obtain a renewed access token.
You can request new access tokens until the refresh token is on the DenyList.
Applications must store refresh tokens securely because they essentially allow a user to remain authenticated forever.

React Auth Kit implements an easy approach to integrate the refresh token.

You can either use the refresh token in your application or you can leave it.

---

## API Builder (createRefresh)

To build the refresh token API, you have to use `createRefresh` function.
It is an identity function. It is mainly used for type checking and mobility.


### Import

```js title="Import createRefresh in your app"
import createRefresh from 'react-auth-kit/createRefresh';
```

### Usage

```js
const my_refresh_api = createRefresh({
  interval: 10 // The time in sec to refresh the Access token,
  refreshApiCallback: async (param) => {
    try {
      const response = await axios.post("/refresh", param, {
        headers: {'Authorization': `Bearer ${param.authToken}`}
      })
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
  }
})

```

### API

[reference/react-auth-kit/createRefresh](./../reference/react-auth-kit/createRefresh.md)

---

## Integration with the App

To add the refresh token feature, simply add the return value of `createRefresh` function in the `createStore` in the refresh prop.

```jsx
import {AuthProvider} from 'react-auth-kit'
import refreshApi from "./refreshApi";

const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
  refresh: my_refresh_api
});

function App() {
  return (
    <AuthProvider store={store}>
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
