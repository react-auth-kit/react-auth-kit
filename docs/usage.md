# Usage

> Integrate the power of _**React Auth Kit**_ in your **React App**

## Introduction

The use of `react-auth-kit` library is very easy and straight forward.
It uses a `AuthProvider` context to bind all its functionalities.
So you have to implement that on the top-level of your app (Preferred in `App.js`).

**Note that**: `AuthProvider` must wrap your routing components, so that you can use the `PrivateRoute` functionality

---
## AuthProvider

`AuthProvider` relies on the [context feature of React](https://reactjs.org/docs/context.html) to pass the Auth information down
to the components.

### Import
```jsx
import { AuthProvider } from 'react-auth-kit'
```

### Demo

Integrate `AuthProvider` before Routes. The best place is `app.js`.


```jsx
//app.js

import React from 'react';
import { AuthProvider } from 'react-auth-kit'
import RouteComponent from './routes';

const App = () => (
    <AuthProvider authStorageType = {'cookie'}
                  authStorageName={'_auth_t'}
                  authTimeStorageName={'_auth_time'}
                  stateStorageName={'_auth_state'}
                  cookieDomain={window.location.hostname}
                  cookieSecure={window.location.protocol === "https:"}
                  refreshTokenName={'_refresh_t'}>
        <RouteComponent />
    </AuthProvider>
);

export default App;
```

### Props

| Name                | Type                       | Default       | Description                                                                                                                                                                         |
|---------------------|----------------------------|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| children            | node                       |               | The content of the component                                                                                                                                                        |
| authStorageType     | 'localstorage' \| 'cookie' | 'cookie'      | The type of the auth storage.  In localstorage, the tokens store in localStorage. In cookie, the tokens sotore in cookies.                                                          |
| authStorageName     | string                     | '_auth_t'     | The name of the storage, which stores the auth token.  Applicable for both cookies and localStorage.                                                                                |
| authTimeStorageName | string                     | '_auth_time'  | The name of the storage, which stores the auth time. Applicable for both cookies and localStorage                                                                                   |
| stateStorageName    | string                     | '_auth_state' | The name of the storage, which stores the auth user state. Applicable for both cookies and localStorage                                                                             |
| refreshTokenName    | string   (`optional`)      |               | The Name of refresh Token storage. If you are now using the refresh token feature, then don't use the prop, if you are using the refresh token feature, only then use the prop. For more information, Go to the [Refresh Token](./refreshtoken) page    |
| cookieDomain        | string   (`optional`)      |               | The Domain name for all cookies. ⚠ If `authStorageType` = `cookie`, then you must put a value Refer [this](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) for more info |
| cookieSecure        | boolean  (`optional`)      | false         | The cookie secure flag. ⚠ If `authStorageType` = `cookie`, then you must put a value Refer [this](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) for more info          |

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">Apache 2.0 License</a> code</i></p>
