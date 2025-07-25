---
title:  useSignOut - React Auth Kit
description: Hook to sign out or log out your user from the application
---

# useSignOut

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" id="ref_useSignOut"></div>

## Import

```js
import useSignOut from 'react-auth-kit/hooks/useSignOut';
```

## Function Signature

**useSignOut**(): () => `boolean`

Sign Out React Hook

Call the hook to sign out and delete all the auth state

This will remove the authState from memory and
also remove the stored data from `cookie` or `localstorage`

## Returns

React Hook with SignOut Functionality

`fn` => (): `boolean`

## Example

Here's a simple example:
```js
import useSignOut from 'react-auth-kit/hooks/useSignOut'

const SecureComponent = () => {
  const signOut = useSignOut()
  return (
    <button onClick={() => signOut()}>Sign Out!</button>
  )
}
```


## Remarks

For Now, this hook doesn't redirect automatically.
So one needs to write the redirect logic himself.

```js
const signOut = useSignOut()
signOut()
navigate('/login')
```

## Throws

[AuthError—](./../errors.md#autherror) Thrown if the Hook is used outside the Provider Scope.

#### Defined in

[hooks/useSignOut.ts](https://github.com/react-auth-kit/react-auth-kit/blob/37dc30d4/packages/react-auth-kit/src/hooks/useSignOut.ts#L43)

---

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">MIT License</a> code</i></p>
