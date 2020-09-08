# Private Route

> Implement Private Route on your React App

React Auth Kit has a `PrivateRoute` functionality Based on [React Router](https://reactrouter.com/)

## Import

```js
import {PrivateRoute} from 'react-auth-kit'
```

## Implementation

Add `PrivateRoute` in your Routes Files inside `BrowserRouter` or `HashRouter`

### Demo

```jsx
<BrowserRouter>
    <PrivateRoute component={privateComponent} path={'/privateRoute'} loginPath={'/loginPath'} exact/>
</BrowserRouter>
```

<details>
    <summary>Full Code</summary>
    <br>


```jsx
import React from "react"
import {BrowserRouter, Route} from "react-router-dom"
import { PrivateRoute } from 'react-auth-kit'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={LoginComponent} path={'/login'} exact/>
            <PrivateRoute component={privateComponent} path={'/privateRoute'} loginPath={'/loginPath'} exact/>
        </BrowserRouter>
    )
}
```
</details>

## Props

As PrivateRoute is a derived version of [Route](https://reactrouter.com/web/api/Route) from `React-Router`, 
that's why the props are same as Route props. Check [this link](https://reactrouter.com/web/api/Route).

***Added Prop***: `loginPath` (_Require_): The fallback path, if the user is unauthorized.

⚠ The only big difference is `PrivateRoute` doesn't support `children` prop. So please don't use that.

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">Apache 2.0 License</a> code</i></p>