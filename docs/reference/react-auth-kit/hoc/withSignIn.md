---
title:  withSignIn - React Auth Kit
description: React Provider for React Auth Kit
---

# withSignIn

> **Deprecated** Higher-order components are not commonly used in modern React code, use Hooks instead

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" id="ref_withSignIn"></div>

## Import

```js
import withSignIn from 'react-auth-kit/higherOrderComponents/withSignIn';
```

## Function Signature

**withSignIn**<`T`, `P`\>(`Component`): `React.FunctionComponent`<`P`\>


## Type Parameters

| Name | Type                            | Description               |
|:-----|:--------------------------------|:--------------------------|
| `T`  | `T`                             | Type of User State Object |
| `P`  | extends `withSignInProps`<`T`\> | -                         |

## Parameters

| Name        | Type                  | Description                 |
|:------------|:----------------------|:----------------------------|
| `Component` | `ComponentType`<`P`\> | React Class based Component |

### signInConfig Parameters

| Name         | Type     | Descripntion      | Required |
|:-------------|:---------|:------------------|:---------|
| `auth.token` | `string` | JWT Auth Token    | `true`   |
| `auth.type`  | `string` | Type of the Token | `false`  |
| `refresh`    | `string` | JWT Refresh Token | `true`   |
| `userState`  | `T`      | User Data         | `false`  |


## Returns

`React.FunctionComponent`<`P`\>

React Higher Order Component with injected `signIn` prop

React [HOC](https://legacy.reactjs.org/docs/higher-order-components.html) that injects
the `signIn` function into the class-based component props.

Call the `signIn` function in the prop
to sign In and authenticate the user

This will authenticate the user by writing the user state into the memory
Also, this will call the RX engine to store the auth in the storage

## Example

Here is an example without the refresh token:
```jsx
class MyComponent extends React.Component {
 this.props.signIn({
   auth: {
     token: '<jwt token>'
   },
   userState: {name: 'React User', uid: 123456}
 })
}
export default withSignIn(MyComponent);
```

Here is an example with a refresh token:
```jsx
class MyComponent extends React.Component {
 this.props.signIn({
   auth: {
     token: '<jwt token>'
   },
   userState: {name: 'React User', uid: 123456},
   refresh: <refresh jwt token>
 }),
}
export default withSignIn(MyComponent);
```

## Throws

[AuthError—](./../errors.md#autherror) Thrown if the Hook is used outside the Provider Scope.


#### Defined in

[higherOrderComponents/withSignIn.tsx](https://github.com/react-auth-kit/react-auth-kit/blob/37dc30d4/packages/react-auth-kit/src/higherOrderComponents/withSignIn.tsx#L74)

---

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">MIT License</a> code</i></p>
