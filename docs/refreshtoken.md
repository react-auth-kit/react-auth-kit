# Refresh Tokens

> Refresh your auth Tokens in an interval

Sometimes, you need to refresh authentication token details, or the authenticated user's state (information).

To do this dynamically in your component,
You have to include the `RefreshToken` object in your component.

You can use in both [`React Hooks`](https://reactjs.org/docs/hooks-intro.html) or
[`React Higher Order Component`](https://reactjs.org/docs/higher-order-components.html)
for both Functional Components and Class-based Components

## 1. Add Refresh Token Object in Component
### Refresh Token using Hooks in Functional Components

RefreshToken object can be included in functional component using `useRefreshToken` hook

```js
import { useRefreshToken } from 'react-auth-kit'
```
#### Demo
```jsx
import React from "react"
import { useRefreshToken } from 'react-auth-kit'

const AnyPrivateComponent = () => {
    const refreshToken = useRefreshToken()

    ...
}
```


### Refresh Token using Higher Order Component in Class-based Components

Sign In using Higher Order Component using `withSignOut`.

Add the `withSignOut` HOC and call the `this.props.signOut` function inside the component

```js
import { withSignOut } from 'react-auth-kit'
```

#### Demo
```jsx
import React from "react"
import { withRefreshToken } from 'react-auth-kit'

class AnyPrivateComponent extends React.Component {
  render(){
    const {refreshToken} = this.props
    return (
      ...
    )
  }
}

export default withRefreshToken(AnyPrivateComponent)
```

## 2. Implement refreshToken object methods

RefreshToken has all the methods you need to refresh the auth states programmatically.

### Methods
There are 4 methods, you can use to refresh the Auth Token and User's details

1. ***getCurrentAuthState()***: Get the current auth token, auth token type, expiring time
2. _**getCurrentUserState()**_: Get the current user state
3. _**updateAuthState()**_: Update the auth state including auth token, auth token type and expiring time
4. **_updateUserState()_**: Update the user's auth state

See the example below for the usage, and see the API for detailed description.

## Full Demo (using hook and FC)
```jsx
import React from 'react'
import axios from 'axios'
import {useRefreshToken} from 'react-auth-kit'

const RefreshComponent = () => {
  const refreshToken = useRefreshToken() // Create the refresh token object

  React.useEffect(()=>{
    const {authToken, authTokenType, expireAt} = refreshToken.getCurrentAuthState() //Get the current state
    const userState = refreshToken.getCurrentUserState()  //Get the current user's state

    //Send the current auth token ad user state to backend
    axios.post('/some/refresh/api/to/backend', data={
      authToken: authToken,
      authTokenType: authTokenType,
      expireAt: expireAt,
      userState: userState
    }).then((res)=>{
      if(res.status === 200) {
        // Setting the auth state
        refreshToken.updateAuthState(res.data.authToken, res.data.authTokenType, res.data.expireIn)

        // Setting the userstate
        refreshToken.updateUserState(res.data.userState)
      }
      else {
        // Throw error
      }
    })
  },[])

  return <React.Fragment/>
}
```

## RefreshToken API

RefreshToken has the following 4 methods.

1. `getCurrentAuthState()`:

Get the current auth state as an object

**Returns** { **authToken**: _string_ | _null_; **authTokenType**: _string_ | _null_; **expireAt**: _Date_ | _null_ }

- **authToken**: current auth token
- **authTokenType**: current auth Token type (eg. Bearer)
- **expireAt**: current expire time

2. `getCurrentUserState()`:

Get the Current User State

**Returns** _object_ | _null_ - Current User state

3. `getCurrentRefreshToken()`:

Get the current Refresh Token

**Returns** { **refreshToken**: _string_ | _null_; **refreshTokenExpireAt**: _Date_ | _null_ }

- **refreshToken**: _string_ | _null_ - Current Refresh Token
- **refreshTokenExpireAt**: _Date_ | _null_ - Expiry time of current refresh Token

4. `updateAuthState()`:

updates the AuthState

**Parameters**

- **authToken**: _string_

    The Updated authToken

- `optional` **authTokenType**: _undefined_ | _string_

    The updated authType (optional)

- `optional` **expiresIn**: _undefined_ | _number_

    The updated expiresIn in minutes. (optional)

If the new `authToken` has different expire time, then you must have to update the `expiresIn` param

**Returns** void

5. `updateRefreshToken()`:

Updates the Current Refresh Token

**Parameters**

- **refreshToken**: _string_

    New Refresh Token

- **expiresIn**: _number_

    New Expiry Time for the new Refresh Token `in Minutes`

**Returns** _void_

6. `updateUserState()`:

Updates the Auth User's state

**Parameters**

**userState**: _object_

  Updated User State

**Returns** void

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">Apache 2.0 License</a> code</i></p>
