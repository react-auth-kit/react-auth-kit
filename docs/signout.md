# Sign Out

> Implement Sign Out on your React App

React Auth Kit has easy to implement Sign In procedures.

It supports both [`Hooks`](https://reactjs.org/docs/hooks-intro.html) and
[`Higher Order Component`](https://reactjs.org/docs/higher-order-components.html)
for both Functional Components and Class-based Components

## Sign Out using Hooks

Sign In using Hooks need `useSignOut` hook

Add the `useSignOut` hook in the component then call the `signOut` inside the component

```js
import { useSignOut } from 'react-auth-kit'
```
### Demo
```jsx
import React from "react"
import { useSignOut } from 'react-auth-kit'

const SignInComponent = () => {
    const signOut = useSignOut()

    return (
      <button onClick={() => signOut()}>Sign Out</button>
    )
}
```


## Sign Out using Higher Order Component

Sign In using Higher Order Component using `withSignOut`.

Add the `withSignOut` HOC and call the `this.props.signOut` function inside the component

```js
import { withSignOut } from 'react-auth-kit'
```

### Demo
```jsx
import React from "react"
import { withSignOut } from 'react-auth-kit'

class signOutComponent extends React.Component {

    render(){
        return (
            <button onClick={() => this.props.signOut()}>Sign Out</button>
        )
    }
}

export default withSignIn(signInComponent)
```

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">Apache 2.0 License</a> code</i></p>
