# Integration
React Auth Kit uses a Context Provider to maintain it's internal state in the application.
So to use auth kit, you must have to add the `AuthProvider` on the very top level of your application.
Without the provider the application will fail to work and will throw errors.

<div data-ea-publisher="authkitarkadipme"
data-ea-type="image" class="horizontal bordered"
data-ea-keywords="javascript|react"></div>

---
## AuthProvider

AuthProvider is the top level [context](https://reactjs.org/docs/context.html) provider for React Auth Kit.
By passing various props in the AuthProvider, you can configure the behaviour of React Auth Kit.

### Import
```javascript
import { AuthProvider } from 'react-auth-kit'
```

### Example

Integrate `AuthProvider` before Routes. The best place is `app.js`.


```javascript
//app.js

import React from 'react';
import { AuthProvider } from 'react-auth-kit'
import RouteComponent from './routes';

const App = () => (
    <AuthProvider authType = {'cookie'}
                  authName={'_auth'}
                  cookieDomain={window.location.hostname}
                  cookieSecure={window.location.protocol === "https:"}>
        <RouteComponent />
    </AuthProvider>
);

export default App;
```

!!! warning

    `AuthProvider` should wrap the **BrowserRouter or HashRouter**,
    otherwise `PrivateRoute` will not work and throw an error.

!!! warning

    If you are using the Refresh Token feature, then you must have to add the `refresh` prop with proper value,
    otherwise refresh token will throw a not implemented error. If you are not using the Refresh Token feature,
    then don't add it

### Props

| Name         | Type                       | Default          | Description                                                                                                                                                                         |
|--------------|----------------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| children     | node                       |                  | The content of the component                                                                                                                                                        |
| authType     | 'localstorage' \| 'cookie' | 'cookie'         | The type of the auth storage.  In localstorage, the tokens store in localStorage. In cookie, the tokens sotore in cookies.                                                          |
| authName     | string                     | '_auth'          | The prefix for the name of the storage, which stores the auth token.  **Applicable for both cookies and localStorage**.                                                                                |
| refresh      | createRefreshParamInterface (`optional`)     || If you are using refresh token, then add this prop. The value of the props must be the return value of `createRefresh` ([See Here](/refreshtoken/#integration-in-auth-provider). If you are not using refresh token, then leave the prop)|
| cookieDomain | string   (`optional`)      | _<current hostname\>_ | The Domain name for cookie. ⚠ If **authType** is `cookie`, then you must put a value. [More Info about Cookie Domain](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) |
| cookieSecure | boolean  (`optional`)      | _<current protocol\>_ | The cookie secure flag. ⚠ If **authType** is `cookie`, then you must put a value. [More Info about Cookie Security](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)         |

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">Apache 2.0 License</a> code</i></p>
