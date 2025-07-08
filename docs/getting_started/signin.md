---
title: Sign In - React Auth Kit
description: Setup the Signin or Login operation of React auth kit in your React-based app using both React Hook and Higher Order Component.
---

# :material-location-enter: Sign In

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" id="signin"></div>

React Auth Kit has easy-to-implement Signin procedures.

**signIn** functionality available in both `React Hook` and `Higher Order Component`

- For Functional Components, you can use `#!js useSignIn()` hook inside any components
- For class-based components, you can wrap the component inside `#!js withSignIn()` HOC function.


---

## Hook

Call `#!js useSignIn()` hook inside any component to signin the user.

### Import

```js title="Import useSignIn in your app" linenums="1"
import useSignIn from 'react-auth-kit/hooks/useSignIn';
```

### Usage

```jsx title="SignIn.js" hl_lines="1 4 8 9 10 11 12 13 14 15 16 17 18" linenums="1"
import useSignIn from 'react-auth-kit/hooks/useSignIn';

const SignInComponent = () => {
    const signIn = useSignIn();
    ...
    const onSubmit = (e) => {
        ...
        if(signIn({
            auth: {
                token: 'ey....mA',
                type: 'Bearer'
            },
            refresh: 'ey....mA',
            userState: {
                name: 'React User',
                uid: 123456
            }
        })){
            // Redirect or do-something
        }else {
            //Throw error
        }
    }

    return (
        ...
    )
}
```

<details>
    <summary>Full Example Code</summary>
    <br>

```jsx hl_lines="3 6 14 15 16 17 18 19 20 21 22" linenums="1"
import React from "react"
import axios from 'axios'
import useSignIn from 'react-auth-kit/hooks/useSignIn';

const SignInComponent = () => {
    const signIn = useSignIn()
    const [formData, setFormData] = React.useState({email: '', password: ''})

    const onSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/login', formData)
            .then((res)=>{
                if(res.status === 200){
                    if(signIn({
                        auth: {
                            token: res.data.token,
                            type: 'Bearer'
                        },
                        refresh: res.data.refreshToken,
                        userState: res.data.authUserState
                    })){ // Only if you are using refreshToken feature
                        // Redirect or do-something
                    }else {
                        //Throw error
                    }
                }
            })
    }

    return (
        <form onSubmit={onSubmit}>
            <input type={"email"} onChange={(e)=>setFormData({...formData, email: e.target.value})}/>
            <input type={"password"} onChange={(e)=>setFormData({...formData, password: e.target.value})}/>

            <button>Submit</button>
        </form>
    )
}
```

</details>

---

## Higher Order Component

Wrap class-based component with `#!js withSignIn()` to implement signin.

### Import

```js title="Import withSignIn in your app" linenums="1"
import withSignIn from 'react-auth-kit/hoc/withSignIn';
```

### Usage

```jsx title="SignIn.js" hl_lines="1 7 8 9 10 11 12 13 14 15 16 17" linenums="1"
import { withSignIn } from 'react-auth-kit'

class signInComponent extends React.Component {

    const onSubmit = (e) => {
        ...
        if(this.props.signIn({
            auth: {
                token: 'ey....mA',
                type: 'Bearer'
            },
            refresh: 'ey....mA',
            userState: {
                name: 'React User',
                uid: 123456
            }
        })){
            // Redirect or do-something
        }else {
            //Throw error
        }
    }

    render(){
        ...
    }
}

export default withSignIn(signInComponent)
```

<details>
    <summary>Full Example Code</summary>
    <br>

```jsx title="SignIn.js" linenums="1"
import React from 'react'
import axios from 'axios'
import { withSignIn } from 'react-auth-kit'

class signInComponent extends React.Component {
    state={email: '', password: ''}

    onSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/login', this.state)
            .then((res)=>{
                if(res.status === 200){
                    if(this.props.signIn({
                        auth: {
                            token: 'ey....mA',
                            type: 'Bearer'
                        },
                        refresh: 'ey....mA',
                        userState: {
                            name: 'React User',
                            uid: 123456
                        }
                    })){
                        // Redirect or do-something
                    }else {
                        //Throw error
                    }
                }
            })
    }

    render(){
        return (
            <form onSubmit={onSubmit}>
                <input type={"email"} onChange={(e)=>this.setState({...this.state, email: e.target.value})}/>
                <input type={"password"} onChange={(e)=>this.setState({...this.state, password: e.target.value})}/>

                <button>Submit</button>
            </form>
        )
    }
}

export default withSignIn(signInComponent)

```

</details>

## API

- [useSignIn](./../reference/react-auth-kit/hooks/useSignIn.md)
- [withSignIn](./../reference/react-auth-kit/hoc/withSignIn.md)


---

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">MIT License</a> code</i></p>
