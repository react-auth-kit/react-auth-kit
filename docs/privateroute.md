# Private Route

> Implement Private Route on your React App

React Auth JWT has a `PrivateRoute` functionality Based on [React Router](https://reactrouter.com/)

## Import

```js
import {PrivateRoute} from 'react-auth-jwt'
```

## Implementation

Add `PrivateRoute` in your Routes Files inside `BrowserRouter` and `HashRouter`

### Demo

```jsx
<BrowserRouter>
    <PrivateRoute Component={privateComponent} path={'/privateRoute'} loginPath={'/loginPath'} exact/>
</BrowserRouter>
```

<details>
    <summary>Full Code</summary>
    <br>


```jsx
import React from "react"
import {BrowserRouter, Route} from "react-router-dom"
import { PrivateRoute } from 'react-auth-jwt'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={LoginComponent} path={'/login'} exact/>
            <PrivateRoute Component={privateComponent} path={'/privateRoute'} loginPath={'/loginPath'} exact/>
        </BrowserRouter>
    )
}
```
</details>

## API
- [`<PrivateRoute/>`](/api)
