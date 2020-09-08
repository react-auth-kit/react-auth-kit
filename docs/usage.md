# Usage

The use of react-auth-kit library is very easy and straight forward.

## Auth Provider

`AuthProvider` relies on the [context feature of React](https://reactjs.org/docs/context.html) to pass the `Auth` down
to the components, so you need to make sure that `AuthProvider` is a parent of the `Routing components`.
You can learn more about this in the API section.

```jsx
import { AuthProvider } from 'react-auth-kit'
```

### Demo

Integrate `AuthProvider` before Routes. Typically, the best place is `app.js`.

app.js
```js
import React from 'react';
import { AuthProvider } from 'react-auth-kit'
import RouteComponent from './routes';

const App = () => (
    <AuthProvider authCookieName={"_a"}
                  authTimeCookieName={"_at"}
                  stateCookieName={"_s"}
                  cookieDomain={window.location.hostname}
                  cookieSecure={window.location.protocol === "https:"}>
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
| cookieDomain        | string                     |               | The Domain name for all cookies. ⚠ If `authStorageType` = `cookie`, then you must put a value Refer [this](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) for more info |
| cookieSecure        | boolean                    | false         | The cookie secure flag. ⚠ If `authStorageType` = `cookie`, then you must put a value Refer [this](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) for more info          |

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">Apache 2.0 License</a> code</i></p>