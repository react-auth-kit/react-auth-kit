---
title: Private Route
description: The RequireAuth component renders child componentsif the user is logged in. If not logged in the user is redirected to the page specified in loginPath prop.
---

# Private Route

> Implement Private Route on your React App

React Auth Kit has a `RequireAuth` functionality Based on [React Router](https://reactrouter.com/)

!!! danger ""

    RequireAuth is only available in react-auth-kit v2.x. It can be used with React Router v6. If you are using React Router v5,
    please use React-kuth-kit v1.x with PrivateRoute.
    Visit [this page](https://authkit.arkadip.dev/v1.6.13/privateroute/) to know more.

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" data-ea-keywords="web|react|javascript|python|database|node|mongo" id="privateroute"></div>

## Import

```js
import { RequireAuth } from 'react-auth-kit'
```

## Implementation

Add `PrivateRoute` in your Routes Files inside `BrowserRouter` or `HashRouter`

### Demo

```jsx
<BrowserRouter>
    <Routes>
      <Route path={'/secure'} element={
        <RequireAuth loginPath={'/login'}>
          <div>
            Secure
          </div>
        </RequireAuth>
      }/>
    </Routes>
</BrowserRouter>
```

<details>
    <summary>Full Code</summary>
    <br>

```jsx
import React from "react"
import {BrowserRouter, Route} from "react-router-dom"
import {PrivateRoute} from 'react-auth-kit'
import SecureComponent from "./SecureComponent";

const Routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/secure'} element={
          <RequireAuth loginPath={'/login'}>
            <SecureComponent/>
          </RequireAuth>
        }/>
      </Routes>
    </BrowserRouter>
  )
}
```

</details>

## Props

| Name      | Type       | Required           | Description                                                                    |
|-----------|------------|--------------------|--------------------------------------------------------------------------------|
| loginPath | string     | :heavy_check_mark: | The fallback path, which will be used in case of the user is not authenticated |
| children  | React.Node | :heavy_check_mark: | The Component, which requires authentication                                   |

***Added Prop***: `loginPath` (*Require*): The fallback path, if the user is unauthorized.

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">Apache 2.0 License</a> code</i></p>
