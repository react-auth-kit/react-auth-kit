# Sign Out

> Implement Sign Out on your React App

React Auth JWT has easy to implement Sign In procedures.

It supports both [`Hooks`](https://reactjs.org/docs/hooks-intro.html) and
[`Higher Order Component`](https://reactjs.org/docs/higher-order-components.html)
for both Functional Components and Class-based Components

## Sign Out using Hooks

Sign In using Hooks need `useSignIn` hook

```js
import { useSignOut } from 'react-auth-jwt'
```
### Demo
```jsx
import React from "react"
import { useSignOut } from 'react-auth-jwt'

const SignInComponent = () => {
    const signOut = useSignOut()

    return (
      <button onClick={() => signOut()}>Sign Out</button>
    )
}
```


## Sign Out using Higher Order Component

Sign In using Higher Order Component using `withSignIn`

```js
import { withSignOut } from 'react-auth-jwt'
```

### Demo
```jsx
import React from "react"
import { withSignOut } from 'react-auth-jwt'

class signOutComponent extends React.Component {

    render(){
        return (
            <button onClick={() => this.props.signOut()}>Sign Out</button>
        )
    }
}

export default withSignIn(signInComponent)
```

## API
- [`useSignOut()`](/api)
- [`withSignOut()`](/api)
