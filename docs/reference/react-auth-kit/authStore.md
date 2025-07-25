---
title: authStore - React Auth Kit
description: Create the Auth Data Store for react
---

# authStore

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" id="ref_createStore"></div>

## Import

```js
import authStore from 'react-auth-kit/store';
```

## Function Signature

**authStore**<`T`\>([`params`](#parameters)): `Store`<`T`\>

authStore creates the default store for React Auth Kit.

This store is like a Redux store, where every object and data is stored.

## Type Parameters

| Name | Description               |
|:-----|:--------------------------|
| `T`  | Type of User State Object |

## Parameters

| Name           | Type                             | Required                 | Description                                                                                                            |
|:---------------|:---------------------------------|:-------------------------|:-----------------------------------------------------------------------------------------------------------------------|
| `authName`     | `string`                         | :heavy_check_mark:       | This name will also be used as a prefix for all other cookies.                                                         |
| `authType`     | `string`                         | :heavy_check_mark:       | Type of the Storage. Options : `cookie` , `localstorage`                                                               |
| `cookieDomain` | `string`                         | :heavy_multiplication_x: | Domain of the cookie, for which the cookie is valid. Needed if you are using `cookie` as authType                      |
| `cookieSecure` | `boolean`                        | :heavy_multiplication_x: | Indicating if the cookie transmission requires a secure protocol (https). Needed if you are using `cookie` as authType |
| `refresh`      | `createRefreshParamInterface<T>` | :heavy_multiplication_x: | Refresh API. Created using [`createRefresh`](./createRefresh.md) function.                                             |

## Returns

Auth Kit Store

## Example

Here is an example on JavaScript

```jsx
import authStore from 'react-auth-kit/store';

const store = authStore({
 authName:'_auth',
 authType:'cookie',
 cookieDomain: window.location.hostname,
 cookieSecure: window.location.protocol === 'https:'
})
```

Here is an example on TypeScript

```ts
interface IUserData {
 name: string;
 uuid: string;
};

const store = authStore<IUserData>({
 authName:'_auth',
 authType:'cookie',
 cookieDomain: window.location.hostname,
 cookieSecure: window.location.protocol === 'https:'
})
```

#### Defined in

[packages/react-auth-kit/src/store/authStore.ts](https://github.com/react-auth-kit/react-auth-kit/blob/37dc30d4/packages/react-auth-kit/src/createStore.ts#L96)

---

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">MIT License</a> code</i></p>
