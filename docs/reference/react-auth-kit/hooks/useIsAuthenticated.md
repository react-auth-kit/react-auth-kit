---
title:  useIsAuthenticated - React Auth Kit
description: Check the authentication status inside the React component
---

# useIsAuthenticated

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" id="ref_useIsAuthenticated"></div>

## Import

```js
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
```

## Function Signature

**useIsAuthenticated**(): () => `boolean`Is Authenticated, React Hook

Call the hook to know if the user is authenticated or not

This uses the context data to determine whether the user is authenticated
or not.

## Returns

`fn` => (): `boolean`

## Example

```js
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'

const Component = () => {
  const isAuthenticated = useIsAuthenticated()
  if (isAuthenticated()) {
    // user authenticated - do somthing
  } else {
    // user not authenticated
  }
}
```

## Throws

[AuthError—](./../errors.md#autherror) Thrown if the Hook is used outside the Provider Scope.


#### Defined in

[hooks/useIsAuthenticated.ts](https://github.com/react-auth-kit/react-auth-kit/blob/37dc30d4/packages/react-auth-kit/src/hooks/useIsAuthenticated.ts#L35)

---

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">MIT License</a> code</i></p>
