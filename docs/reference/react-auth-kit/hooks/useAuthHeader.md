---
title:  useAuthHeader - React Auth Kit
description: Get the auth header into the react component
---

# useAuthHeader

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" id="ref-useAuthHeader"></div>

## Import

```js
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
```

## Function Signature

**useAuthHeader**(): `string` | ``null``

Auth Header React Hook

Call the hook,
to get the auth header inside the component

**Format: `type token` (authType<space\>authToken)**

## Returns

`string` \| ``null``

If the user is authenticated,
then `'auth.type auth.token'` is returned.
If the user is not authenticated, then `null` is returned.

## Example

Here is a simple example
```jsx
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'

const Component = () => {
 const authHeader = useAuthHeader();
 const headers = {
   'Authorization': authHeader
 },
 // use the headers in the network request
 ...
}
```

## Throws

[AuthError](./../errors.md#autherror)
Thrown if the Hook is used outside the Provider Scope.

#### Defined in

[hooks/useAuthHeader.ts](https://github.com/react-auth-kit/react-auth-kit/blob/37dc30d4/packages/react-auth-kit/src/hooks/useAuthHeader.ts#L36)

---

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">MIT License</a> code</i></p>
