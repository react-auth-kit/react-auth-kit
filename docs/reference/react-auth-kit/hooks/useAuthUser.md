---
title:  useAuthUser - React Auth Kit
description: Get the data of the user into the react component
---

# useAuthUser

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" id="ref_useAuthUser"></div>

## Import

```js
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
```

## Function Signature

**useAuthUser**<`T`\>`(): T | null`

Auth User Data React Hook

Call the hook,
to get the authenticated user data into your React Component

This uses the context data to determine the user data

## Type Parameters

| Name | Description               |
|:-----|:--------------------------|
| `T`  | Type of User State Object |

## Returns

`T` \| ``null``

React Hook with user state functionality.
If the user is authenticated, then user data is returned.
If the user is not authenticated, then `null` is returned.


## Example
Here is an example of JavaScript
```js
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

const Component = () => {
 const authUser = useAuthUser()
 const name = authUser.name;
 const uuid = authUser.uuid;
 ...
}
```
Here is the example of TypeScript
```ts
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

interface IUserData {
 name: string;
 uuid: string;
};

const Component = () => {
 const authUser = useAuthUser<IUserData>()
 const name = authUser.name;
 const uuid = authUser.uuid;
 ...
}
```

## Throws

[AuthError](./../errors.md#autherror)
Thrown if the Hook is used outside the Provider Scope.

#### Defined in

[hooks/useAuthUser.ts](https://github.com/react-auth-kit/react-auth-kit/blob/37dc30d4/packages/react-auth-kit/src/hooks/useAuthUser.ts#L52)

---

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">MIT License</a> code</i></p>
