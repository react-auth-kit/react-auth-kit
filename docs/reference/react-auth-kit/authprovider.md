---
title:  AuthProvider - React Auth Kit
description: React Auth Provider for React Auth Kit
---


# AuthProvider

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" id="ref_AuthProvider"></div>

## Import

```js
import AuthProvider from 'react-auth-kit';
```


## Function Signature

**AuthProvider**<`T`\>(`#!js {store: createStoreReturn<T>, children: React.ReactNode}`): `ReturnType`<`#!js React.FC`\>

React Provider that includes React Auth Kit functionality in your React
Application.

## Type Parameters

| Name | Description | Type |
| :------ | :------ | :------ |
| `T` | Type of User State Object | extends `object` |

## Parameters

| Name | Type | Required | Description |
| :------ | :------ | :------- |:--------- |
| `store` | `createStoreReturn`<`T`\> | :heavy_check_mark: | Returned value from [createStore](./createStore.md) function |
| `children` | `React.ReactNode` | :heavy_check_mark: | React Component or Element |

## Returns

`#!ts ReturnType<React.FC>`

React Functional component with React Auth Kit Recharged.

##  Remarks

Make sure you wrap your application as well as your router components in AuthProvider.

AuthProvider should be your Topmost element so that it can work effectively
throughout the application.

## Example

```react
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore'; 

const store = createStore();

<AuthProvider store={store}>
 <RoutesComponent/>
</AuthProvider>
```

#### Defined in

[packages/react-auth-kit/src/AuthProvider.tsx](https://github.com/react-auth-kit/react-auth-kit)

---

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">MIT License</a> code</i></p>
