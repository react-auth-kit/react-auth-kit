# Usage

The use of react-auth-jwt library is very easy and straight forward.

## Auth Provider

`AuthProvider` relies on the [context feature of React](https://reactjs.org/docs/context.html) to pass the `Auth` down
to the components, so you need to make sure that `AuthProvider` is a parent of the `Routing components`.
You can learn more about this in the API section.

### Demo

Integrate `AuthProvider` before Routes. Typically, the best place is `app.js`.

app.js
```js
import React from 'react';
import { AuthProvider } from 'react-auth-jwt'
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

- **authCookieName**: Name of the  Cookie to store the Auth Token
- **authTimeCookieName**: Name of the Cookie to store the Auth Token validity
- **stateCookieName**: Name of the Cookie to store the Auth User Data
- **cookieDomain**: Domain name for all 3 cookies
- **cookieSecure**: Domain Secure (HTTP/HTTPS)

### API
> TODO: API

