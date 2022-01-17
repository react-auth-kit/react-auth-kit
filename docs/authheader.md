# Auth Header

Get the Auth Header for future request from any Component simply by using `HOC` or `Hooks`

- To get the Auth Header from _Higher Order Components_, use `withAuthHeader`
- To get the Auth Header using _React Hooks_, use `useAuthHeader`

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" data-ea-keywords="web|react|javascript|python|database|node|mongo" id="authheader"></div>

## Using Hooks

```js
import {useAuthHeader} from 'react-auth-kit'
```

### Demo
```jsx
import React from 'react'
import {useAuthHeader} from 'react-auth-kit'

const SomeComponent = () => {
    const authHeader = useAuthHeader()

    return(
        <div>
            {authHeader}
        </div>
    )
}
```

## Using Higher Order Component

```jsx
import {withAuthHeader} from 'react-auth-kit'
```

### Demo
```jsx
import React from 'react'
import {withAuthHeader} from 'react-auth-kit'

class SomeComponent extends React.Component {
    render(){
        return (
            <div>
                {this.props.authHeader}
            </div>
        )
    }
}

export default withAuthHeader(SomeComponent)
```


<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">Apache 2.0 License</a> code</i></p>
