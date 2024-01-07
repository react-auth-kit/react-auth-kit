---
title: Auth status - React Auth Kit
description: Check if the user is authenticated or not inside a component by just calling Auth Header hook or Higher order component.
---

# Authentication status :material-list-status:

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" id="checkauth"></div>

## Introduction

To get the information of whether the user is authenticated or not, `React Auth Kit` comes with `isAuth` functions

---

`IsAuth` functionality available in both `hook` and `Higher Order Component`

- For Functional Components, you can use `#!js useIsAuthenticated()` hook inside any components
- For class-based components, you can wrap the component inside `#!js withIsAuthenticated()` HOC function.

---

## Hook

Check the `authentication status` in React Functional Components(FC) by adding the `useIsAuthenticated` hook inside it.

### Import

```jsx title="Import useIsAuthenticated in your app"
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
```

### Demo

```jsx title="Component.js"
import React from 'react';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'

const AnyComponent = () => {
    const isAuthenticated = useIsAuthenticated()

    if(isAuthenticated()){
        // Redirect to Dashboard
    }
    else {
        // Redirect to Login
    }
}
```

### API

[reference/react-auth-kit/hooks/useIsAuthenticated](./../reference/react-auth-kit/hooks/useIsAuthenticated.md)

---

## Higher Order Component

### Import

```jsx title="Import withAuthUser in your app"
import withIsAuthenticated from 'react-auth-kit/hoc/withIsAuthenticated';
```

### Usage

```javascript
import React from "react";
import withIsAuthenticated from 'react-auth-kit/hoc/withIsAuthenticated';

class SomeComponent extends React.Component {

    render(){
        if(this.props.isAuthenticated()){
            // Redirect to Dashboard
        }
        else {
            // Redirect to Login
        }
    }
}

export default withIsAuthenticated(SomeComponent)
```

### API

[reference/react-auth-kit/hoc/withIsAuthenticated](./../reference/react-auth-kit/hoc/withIsAuthenticated.md)

---

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">Apache 2.0 License</a> code</i></p>
