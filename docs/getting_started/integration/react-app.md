---
title: Integration - React Auth Kit
description: Easily integrate the ease and power of React Auth Kit into your React Web Application with just two lines of code.
---

# :simple-react:{ .lg .middle .label-color} Integration

React Auth Kit uses an [`RxJs`](https://rxjs.dev/)-based store to maintain data and React's [Context API](https://react.dev/reference/react/createContext) to distribute data throughout the application.

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" id="integration"></div>

---

## Store Creation

To use React Auth Kit in the application, we first need to create the store that holds the data for our application.

### Import

```js title="Import authStore in your app" linenums="1"
import authStore from 'react-auth-kit/store';
```

### Usage

```js title="Create Store" linenums="1"
const store = authStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});
```

## AuthProvider

AuthProvider provides top-level [context](https://reactjs.org/docs/context.html) API for React Auth Kit.

### Import

```js title="Import AuthProvider in your app" linenums="1"
import AuthProvider from 'react-auth-kit';
```

### Usage

Integrate `AuthProvider` before Routes. The best place is `app.js`.

```jsx title="app.js" hl_lines="6 7 8" linenums="1"
import React from 'react';
import { AuthProvider } from 'react-auth-kit'
import RouteComponent from './routes';

const App = () => (
    <AuthProvider store={store}>
      <RoutesComponent/>
    </AuthProvider>
);

export default App;
```

## API

- [authStore](../../reference/react-auth-kit/authStore.md)
- [AuthProvider](./../../reference/react-auth-kit/authprovider.md)

!!! warning

    `AuthProvider` should wrap the **BrowserRouter or HashRouter**,
    otherwise `PrivateRoute` will not work and throw an error.

!!! warning

    If you are using the Refresh Token feature, then you must add the `refresh` prop with proper value,
    otherwise refresh token will throw a not implemented error. If you are not using the Refresh Token feature,
    then don't add it

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">MIT License</a> code</i></p>
