---
title: Sign In Operation
description: Sign In Operation of React auth, using both React Hook and Higher Order Component.
---

# Sign In

> :material-lock: Implement Sign In on your Single Page Web App

React Auth Kit has easy to implement Sign In procedures.

`signIn` functionality available in both `React Hook` and `Higher Order Component`

- For Functional Components, you can use `#!js useSignIn()` hook inside any components
- For class based components, you can wrap the component inside `#!js withSignIn()` HOC function.

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" data-ea-keywords="web|react|javascript|python|database|node|mongo" id="signin"></div>

---

## Usage

### Functional Component

`signIn` in React Functional Components(FC) by adding the `#!js useSignIn()` hook inside it.

#### Import

```js
import { useSignIn } from 'react-auth-kit'
```

#### Demo

```jsx title="SignIn.js" hl_lines="1 4 8 9 10 11 12 13 14 15"
import { useSignIn } from 'react-auth-kit'

const SignInComponent = () => {
    const signIn = useSignIn()
    ...
    const onSubmit = (e) => {
        ...
        if(signIn(
            {
                token: res.data.token,
                expiresIn:res.data.expiresIn,
                tokenType: "Bearer",
                authState: res.data.authUserState,
                refreshToken: res.data.refreshToken,                    // Only if you are using refreshToken feature
                refreshTokenExpireIn: res.data.refreshTokenExpireIn     // Only if you are using refreshToken feature
            }
        )){
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

```jsx hl_lines="3 6 14 15 16 17 18 19 20 21 22"
import React from "react"
import axios from 'axios'
import { useSignIn } from 'react-auth-kit'

const SignInComponent = () => {
    const signIn = useSignIn()
    const [formData, setFormData] = React.useState({email: '', password: ''})

    const onSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/login', formData)
            .then((res)=>{
                if(res.status === 200){
                    if(signIn(
                        {
                            token: res.data.token,
                            expiresIn:res.data.expiresIn,
                            tokenType: "Bearer",
                            authState: res.data.authUserState,
                            refreshToken: res.data.refreshToken,                    // Only if you are using refreshToken feature
                            refreshTokenExpireIn: res.data.refreshTokenExpireIn     // Only if you are using refreshToken feature
                        }
                    )){ // Only if you are using refreshToken feature
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

#### API

`#!ts useSignIn(): (signInConfig) => boolean`

For details about `signInConfig`, please go to the [signInConfig](#signinconfig) section

---

### Class Based Component

Sign In using Higher Order Component using `withSignIn`

#### Import

```js
import { withSignIn } from 'react-auth-kit'
```

#### Demo

```jsx title="SignIn.js" hl_lines="1 7 8 9 10 11 12 13 14 15"
import { withSignIn } from 'react-auth-kit'

class signInComponent extends React.Component {

    const onSubmit = (e) => {
        ...
        if(this.props.signIn(
            {
                token: res.data.token,
                expiresIn:res.data.expiresIn,
                tokenType: "Bearer",
                authState: res.data.authUserState,
                refreshToken: res.data.refreshToken,                    // Only if you are using refreshToken feature
                refreshTokenExpireIn: res.data.refreshTokenExpireIn     // Only if you are using refreshToken feature
            }
        )){
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

```jsx
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
                    if(this.props.signIn(
                        {
                            token: res.data.token,
                            expiresIn:res.data.expiresIn,
                            tokenType: "Bearer",
                            authState: res.data.authUserState,
                            refreshToken: res.data.refreshToken,                    // Only if you are using refreshToken feature
                            refreshTokenExpireIn: res.data.refreshTokenExpireIn     // Only if you are using refreshToken feature
                        }
                    )){
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

#### API

`#!ts withSignIn(Component: React.ComponentType): React.FC`

_**Returns**_  `#!ts React.FC<P>` (Functional Component with `signIn(signInConfig)` prop)

For details about `signInConfig`, please go to the [signInConfig](#signinconfig) section

---

### SignInConfig

```js
{
  token: string
  tokenType: string | 'Bearer'
  expiresIn: number
  authState: object
  refreshToken?: string
  refreshTokenExpireIn?: number
}
```

#### Explanation of SignInConfig

| Name                 | Type                | Description                                                                                                                                                                  |
|----------------------|---------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| token                | string              | The Authentication token (JWT) to be stored from server                                                                                                                      |
| tokenType            | string  \| 'Bearer' | The type of authentication token.                                                                                                                                            |
| expiresIn            | number              | The time for which the auth token will last, `in minutes`                                                                                                                    |
| authState            | object (`optional`) | State of the authorized user. Eg: `#!js {name: Jhon, email: jhon@auth.com}`                                                                                                  |
| refreshToken         | string (`optional`) | Refresh Token sent by the server. Use only, if you are using refresh token feature. For more info Go to the [Refresh Token](./refreshtoken) page                             |
| refreshTokenExpireIn | number (`optional`) | The time for which the refresh token will last, `in minutes`, Use only, if you are using refresh token feature. For more info Go to the [Refresh Token](./refreshtoken) page |

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">Apache 2.0 License</a> code</i></p>
