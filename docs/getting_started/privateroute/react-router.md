---
title: React Router - Private Route
description: The RequireAuth component renders child componentsif the user is logged in. If not logged in the user is redirected to the page specified in loginPath prop.
---

# :simple-reactrouter: Private Route with React Router 

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" id="privateroute_reactrouter"></div>

!!! danger ""

    RequireAuth can only be used with React Router v6. If you are using React Router v5,
    please use React-kuth-kit v1.x with PrivateRoute.

## Installation

To use Private Route with React Router, you need to install the `react-router plugin` for react auth kit.

To install and save in your `package.json` dependencies, run:

=== ":simple-npm: npm"

    ```bash title="Install With NPM"  linenums="1"
    npm install --save @auth-kit/react-router
    ```

=== ":simple-yarn: yarn"

    ```bash title="Install With Yarn" linenums="1"
    yarn add @auth-kit/react-router
    ```

=== ":simple-pnpm: pnpm"

    ```bash title="Install With PNPM"  linenums="1"
    pnpm install --save @auth-kit/react-router
    ```

## Usage

`@auth-kit/react-router` comes with 2 useful functions that help to manage routing with React Router.

These Functions are:

1. [AuthOutlet](#authoutlet) - Used to Secure multiple routes at once.
2. [RequireAuth](#requireauth) - Used to Secure individual routes one at a time, preferred for a granular approach. 

### AuthOutlet

#### Import

```js title="Import AuthOutlet"  linenums="1"
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
```

#### Usage

Add `AuthOutlet` in your Routes Files inside `BrowserRouter` or `HashRouter`

```jsx title="RouteComponent.jsx" hl_lines="5"  linenums="1"
<BrowserRouter>
  <Routes>
    <Route path={'/'} element={<Home/>}/>
    <Route path={'/login' } element={<Login/>}/>
    <Route element={<AuthOutlet fallbackPath='/login' />}>
      <Route path='/' element={<Users/>} />
      <Route path='/products' element={<Products/>} />
    </Route>
  </Routes>
</BrowserRouter>
```

<details>
    <summary>Full Code</summary>
    <br>

```jsx  linenums="1"
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';
import SecureComponent from "./SecureComponent";

const Routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/login' } element={<Login/>}/>
        <Route element={<AuthOutlet fallbackPath='/login' />}>
          <Route path='/' element={<Users/>} />
          <Route path='/products' element={<Products/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```
</details>


### RequireAuth

#### Import

```js title="Import RequireAuth" linenums="1"
import RequireAuth from '@auth-kit/react-router/RequireAuth'
```

#### Usage

Add `RequireAuth` in your Routes Files inside `BrowserRouter` or `HashRouter`

```jsx title="RouteComponent.jsx" hl_lines="5 6 7 8 9 10" linenums="1"
<BrowserRouter>
  <Routes>
    <Route path={'/'} element={<Home/>}/>
    <Route path={'/login' } element={<Login/>}/>
    <Route path={'/secure'} element={
      <RequireAuth fallbackPath={'/login'}>
        <SecureComponent/>
          </RequireAuth>
      }
    />
  </Routes>
</BrowserRouter>
```


<details>
    <summary>Full Code</summary>
    <br>

```jsx linenums="1"
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import RequireAuth from '@auth-kit/react-router/RequireAuth';
import SecureComponent from "./SecureComponent";

const Routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/login' } element={<Login/>}/>
        <Route path={'/secure'} element={
          <RequireAuth fallbackPath={'/login'}>
            <SecureComponent/>
          </RequireAuth>
        }
        />
      </Routes>
    </BrowserRouter>
  )
}
```
</details>



<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">Apache 2.0 License</a> code</i></p>
