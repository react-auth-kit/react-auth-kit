---
title: User Data - React Auth Kit
description: Get the Authenticated user's data from any component using the Auth User Hook or Auth User Higher-order Component.
---

# :material-information: User Data

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" id="authdata"></div>

Get the Authorized user's state from any Component simply by using `HOC` or `Hooks`

- For Functional Components, you can use `#!js useAuthUser()` hook inside any components
- For class-based components, you can wrap the component inside `#!js withAuthUser()` HOC function.


## Hook

### Import

```js title="Import useAuthUser in your app" linenums="1"
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
```

### Usage

```jsx title="SecureComponent.js" linenums="1" hl_lines="2 5 9"
import React from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

const SomeComponent = () => {
    const auth = useAuthUser()

    return(
        <div>
            Hello {auth.user}
        </div>
    )
}
```

## Higher Order Component

### Import

```jsx title="Import withAuthUser in your app" linenums="1"
import withAuthUser from 'react-auth-kit/hoc/withAuthUser';
```

### Usage

```jsx title="SecureComponent.js" linenums="1" hl_lines="2 8 14"
import React from 'react';
import withAuthUser from 'react-auth-kit/hoc/withAuthUser';

class SomeComponent extends React.Component {
    render(){
        return (
            <div>
                Hello {this.props.authState.user}
            </div>
        )
    }
}

export default withAuthUser(SomeComponent)
```

## API

- [useAuthUser](./../reference/react-auth-kit/hooks/useAuthUser.md)
- [withAuthUser](./../reference/react-auth-kit/hoc/withAuthUser.md)

---

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">MIT License</a> code</i></p>
