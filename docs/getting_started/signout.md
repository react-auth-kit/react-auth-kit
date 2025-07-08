---
title: Sign Out - React Auth Kit
description: Sign out Hook or Sign out Higher-order Component handles all the necessary Sign out operations in one function.
---

# :material-exit-run: Sign Out

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" id="signout"></div>

React Auth Kit has easy-to-implement Sign Out procedures.

**signOut** functionality available in both `React Hook` and `Higher Order Component`

- For Functional Components, you can use `#!js useSignOut()` hook inside any components
- For class-based components, you can wrap the component inside `#!js withSignOut()` HOC function.


## Hook

Call `#!js useSignOut()` hook inside any component to sign out the user.

### Import

```js title="Import useSignOut in your app" linenums="1"
import useSignOut from 'react-auth-kit/hooks/useSignOut';
```

### Usage

```jsx title="SignOut.js" linenums="1" hl_lines="2 5 8"
import React from "react"
import useSignOut from 'react-auth-kit/hooks/useSignOut';

const SignOutComponent = () => {
    const signOut = useSignOut()

    return (
      <button onClick={() => signOut()}>Sign Out</button>
    )
}
```

## Higher Order Component

Wrap class-based component with `#!js withSignOut()` to implement signout.

### Import

```js title="Import withSignOut in your app" linenums="1"
import withSignOut from 'react-auth-kit/hoc/withSignOut';
```

### Demo

```jsx title="SignOut.js" linenums="1" hl_lines="2 8 13"
import React from "react"
import withSignOut from 'react-auth-kit/hoc/withSignOut';

class signOutComponent extends React.Component {

    render(){
        return (
            <button onClick={() => this.props.signOut()}>Sign Out</button>
        )
    }
}

export default withSignIn(signOutComponent)
```

## API

- [useSignOut](./../reference/react-auth-kit/hooks/useSignOut.md)
- [withSignOut](./../reference/react-auth-kit/hoc/withSignOut.md)

---

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">MIT License</a> code</i></p>
