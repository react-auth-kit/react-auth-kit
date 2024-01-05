---
title:  withAuthUser - React Auth Kit
description: Inject User's state inside your react class-based component
---

# withAuthUser

> **Deprecated** Higher-order components are not commonly used in modern React code, use Hooks instead

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" id="ref_withAuthUser"></div>

## Function Signature

**withAuthUser**<`T`, `P`\>(`Component`): `React.FunctionComponent`<`P`\>

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------- |
| `T` | `T` | Type of User State Object |
| `P` | extends `withAuthStateProps`<`T`\> | Props of the component |

## Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `Component` | `ComponentType`<`P`\> | React Class based Component |

## Returns

`React.FunctionComponent`<`P`\>

React Higher Order Component with injected `authState` prop


React [HOC](https://legacy.reactjs.org/docs/higher-order-components.html) that injects the user state into
the class based component props

If the prop is null then user may be not authenticated.
Use `isAuthenticated` to verify

## Example

```jsx
class MyComponent extends React.Component {
 render() {
   return <h1>Hello, {this.props.authState}</h1>;
 }
}
export default withAuthUser(MyComponent);
```

## Throws

[AuthError](./../errors.md#autherror) - Thrown if the Hook is used outside the Provider Scope.

#### Defined in

[higherOrderComponents/withAuthUser.tsx:47](https://github.com/react-auth-kit/react-auth-kit/blob/37dc30d4/packages/react-auth-kit/src/higherOrderComponents/withAuthUser.tsx#L47)

---

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">MIT License</a> code</i></p>
