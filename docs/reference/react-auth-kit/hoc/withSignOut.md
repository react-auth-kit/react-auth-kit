---
title:  withSignOut - React Auth Kit
description: React Provider for React Auth Kit
---

# withSignOut

> **Deprecated** Higher-order components are not commonly used in modern React code, use Hooks instead

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" id="ref_withSignOut"></div>

## Import

```js
import withSignOut from 'react-auth-kit/higherOrderComponents/withSignOut';
```

## Function Signature

**withSignOut**<`P`\>(`Component`): `React.FunctionComponent`<`P`\>

## Type Parameters

| Name | Type                       | Description            |
|:-----|:---------------------------|:-----------------------|
| `P`  | extends `withSignOutProps` | Props of the component |

## Parameters

| Name        | Type                  | Description                 |
|:------------|:----------------------|:----------------------------|
| `Component` | `ComponentType`<`P`\> | React Class based Component |

## Returns

`React.FunctionComponent`\<`P`\>

React Higher Order Component with injected `signOut` prop

React [HOC](https://legacy.reactjs.org/docs/higher-order-components.html) that injects
the `signOut` function into the class-based component props.

Call the `signOut` function in the prop
to sign out and delete all the auth state

This will remove the authState from memory and
also remove the stored data from cookie or localstorage

## Example

Here's a simple example:
```jsx
class MyComponent extends React.Component {
 this.props.signOut();
 ...
}
export default withSignOut(MyComponent);
```

## Remarks

For Now, this hook doesn't redirect automatically.
So one needs to write the redirect logic himself.

## Throws

[AuthError—](./../errors.md#autherror) Thrown if the Hook is used outside the Provider Scope.


#### Defined in

[higherOrderComponents/withSignOut.tsx](https://github.com/react-auth-kit/react-auth-kit/blob/37dc30d4/packages/react-auth-kit/src/higherOrderComponents/withSignOut.tsx#L47)

---

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">MIT License</a> code</i></p>
