---
title: Refresh Token - React Auth Kit
description: Refresh the auth token in the background by using the Refresh token feature. Just use the createRefresh builder.
---


# :material-refresh: Refresh the Access token using Refresh Token

`Refresh` the access token periodically using a Refresh token.

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

```js title="Import createRefresh in your app" linenums="1"
import createRefresh from 'react-auth-kit/createRefresh';
```

### Usage

```js title="refresh.js" linenums="1"
const refresh = createRefresh({
    interval: 10, // The time in sec to refresh the Access token,
    refreshApiCallback: async (param) => {
        try {
            const response = await axios.post("/refresh", param, {
                headers: {'Authorization': `Bearer ${param.authToken}`}
            })
            console.log("Refreshing")
            return {
                isSuccess: true,
                newAuthToken: response.data.token,    // New Access token
                newAuthTokenExpireIn: 10,
                newRefreshTokenExpiresIn: 60
            }
        } catch (error) {
            console.error(error)
            return {
                isSuccess: false
            }
        }
    },
    initialRefreshComponent: <RefreshComponent/>   // Optional, The component to show while refreshing for the first time
})

```

### Initial Refresh Component

You can show a loading component while refreshing for the first time.

Here is an example of the initial refresh component.

```jsx title="refresh.js" linenums="1"
const RefreshComponent = () => {
 return (
  <div>
   Initial refreshing................
  </div>
 )
}

export default RefreshComponent;
```

---

## Integration with the App

To add the refresh token feature, simply add the return value of `createRefresh` function in the `authStore` in the refresh prop.

```jsx title="app.js" linenums="1"
import {AuthProvider} from 'react-auth-kit'
import refresh from "./refresh";

const store = authStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
  refresh: refresh
});

function App() {
  return (
    <AuthProvider store={store}>
      <Routes/>
    </AuthProvider>
  );
}
```

## API

[createRefresh](./../reference/react-auth-kit/createRefresh.md)

!!! warning "Only use the return from createRefresh as the prop value"

    Using values other than the return of `createRefresh` will cause the application to break.
    So only use the return of `createRefresh` as the prop value.

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">Apache 2.0 License</a> code</i></p>
