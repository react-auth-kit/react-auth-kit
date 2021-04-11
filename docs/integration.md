# Integration

> Integrate the power of _**React-Auth-Kit**_ in your **React App**

The use of `react-auth-kit` library is very easy and straight forward.

---
## AuthProvider

`AuthProvider` relies on the [context feature of React](https://reactjs.org/docs/context.html) to pass the Auth information down
to the components.

### Import
```javascript
import { AuthProvider } from 'react-auth-kit'
```

### Demo

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
                  cookieSecure={window.location.protocol === "https:"}
                  refreshToken>
        <RouteComponent />
    </AuthProvider>
);

export default App;
```

⚠️ `AuthProvider` should wrap the **Routing component** including the browser router,
otherwise `PrivateRoute` will not work and throws an error.

⚠️ If you are using the Refresh Token feature, then you must have to add the `refreshToken` prop,
otherwise refresh token will throw a not implemented error. If you are not using the Refresh Token feature,
then It is a good practice not to leave the `refreshToken` prop

### Props

| Name         | Type                       | Default          | Description                                                                                                                                                                         |
|--------------|----------------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| children     | node                       |                  | The content of the component                                                                                                                                                        |
| authType     | 'localstorage' \| 'cookie' | 'cookie'         | The type of the auth storage.  In localstorage, the tokens store in localStorage. In cookie, the tokens sotore in cookies.                                                          |
| authName     | string                     | '_auth'          | The prefix for the name of the storage, which stores the auth token.  **Applicable for both cookies and localStorage**.                                                                                |
| refreshToken | boolean   (`optional`)     |                  | **Is using refreshToken?** Then, add this prop.  If you are now using the refresh token feature, then don't use the prop. For detailed info of Refresh Token, Go to the [Refresh Token](./refreshtoken) page |
| cookieDomain | string   (`optional`)      | _<current hostname\>_ | The Domain name for cookie. ⚠ If **authType** is `cookie`, then you must put a value. [More Info about Cookie Domain](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) |
| cookieSecure | boolean  (`optional`)      | _<current protocol\>_ | The cookie secure flag. ⚠ If **authType** is `cookie`, then you must put a value. [More Info about Cookie Security](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)         |

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">Apache 2.0 License</a> code</i></p>
