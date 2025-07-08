---
title: createStore - React Auth Kit
description: Create the Auth Data Store for react
---

# createStore

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" id="ref_createStore"></div>

## Import

```js
import createStore from 'react-auth-kit/createStore';
```

## Function Signature

**createStore**<`T`\>([`params`](#parameters)): `Store`<`T`\>

createStore creates the default store for React Auth Kit.

This store is like a Redux store, where every object and data is stored.

## Type Parameters

| Name | Description |
| :------ | :------ |
| `T` | Type of User State Object |

## Parameters

| Name       | Type    | Required | Description |
| :--------- | :------ | :----- | :------ |
| `authName` | `string` | :heavy_check_mark: | This name will also be used as a prefix for all other cookies. |
| `authType` | `string` | :heavy_check_mark: | Type of the Storage. Options : `cookie` , `localstorage` |
| `cookieDomain` | `string` | :heavy_multiplication_x: | Domain of the cookie, for which the cookie is valid. Needed if you are using `cookie` as authType |
| `cookieSecure` | `boolean` | :heavy_multiplication_x: | Indicating if the cookie transmission requires a secure protocol (https). Needed if you are using `cookie` as authType |
| `refresh` | `createRefreshParamInterface<T>` | :heavy_multiplication_x: | Refresh API. Created using [`createRefresh`](./createRefresh.md) function. |

## Returns

Auth Kit Store

## Example

Here is an example on JavaScript

```jsx
import createStore from 'react-auth-kit/createStore';

const store = createStore({
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

const store = createStore<IUserData>({
 authName:'_auth',
 authType:'cookie',
 cookieDomain: window.location.hostname,
 cookieSecure: window.location.protocol === 'https:'
})
```

#### Defined in

[packages/react-auth-kit/src/createStore.ts:96](https://github.com/react-auth-kit/react-auth-kit/blob/37dc30d4/packages/react-auth-kit/src/createStore.ts#L96)

---

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">MIT License</a> code</i></p>
