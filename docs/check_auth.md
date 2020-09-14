# Check Authentication

> Check if any user is authenticated or not

## Introduction

There is many time, when you have to understand if any user is authenticated 
(especially in `login` pages, where you have to redirect your user to its dashboard or allow to login)

For this reason, `React Auth Kit` comes with `isAuth` functions

---

`IsAuth` functionality available in both `hook` and `Higher Order Component`

- For Functional Components, you can use `useIsAuthenticated` function inside any components
- For class based components, you can wrap the component inside `withIsAuthenticated` function

---

## Usage
### Functional Component

Check the `authentication status` in React Functional Components(FC) by adding the `useIsAuthenticated` hook inside it.

#### Import

```jsx
import {useIsAuthenticated} from 'react-auth-kit';
```

#### Demo

```jsx
import {useIsAuthenticated} from 'react-auth-kit';

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

#### API

`useIsAuthenticated()`

_**Returns**_  `() => boolean`

---

### Class Based Component

#### Import

```javascript
import {withIsAuthenticated} from 'react-auth-kit';
```

#### Demo
```javascript
import React from "react";
import {withIsAuthenticated} from 'react-auth-kit';

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

#### API
`#!ts withIsAuthenticated<P>(Component: React.ComponentType<P>): React.FC<P>`

_**Parameters**_

- Component: `#!ts React.ComponentType<P>`

_**Returns**_  `#!ts React.FC<P>` (Functional Component with `isAuthenticated()` prop)

---

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">Apache 2.0 License</a> code</i></p>