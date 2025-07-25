---
title:  withIsAuthenticated - React Auth Kit
description: Inject authentication status inside your react class-based component
---

# withIsAuthenticated

> **Deprecated** Higher-order components are not commonly used in modern React code, use Hooks instead

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" id="ref_withIsAuthenticated"></div>

## Import

```js
import withIsAuthenticated from 'react-auth-kit/higherOrderComponents/withIsAuthenticated';
```

## Function Signature

**withIsAuthenticated**<`P`\>(`Component`): `React.FunctionComponent`<`P`\>

## Type Parameters

| Name | Type                          | Description            |
|:-----|:------------------------------|:-----------------------|
| `P`  | extends `withAuthHeaderProps` | Props of the component |

## Parameters

| Name        | Type                  | Description                 |
|:------------|:----------------------|:----------------------------|
| `Component` | `ComponentType`<`P`\> | React Class based Component |

## Returns

`React.FunctionComponent`<`P`\>

React Higher Order Component with injected `isAuth` prop

React [HOC](https://legacy.reactjs.org/docs/higher-order-components.html) that injects
the authentication state into the class-based component props

## Example

```jsx
class MyComponent extends React.Component {
 render() {
   return <h1>Hello, {this.props.isAuth}</h1>;
 }
}
export default withIsAuthenticated(MyComponent);
```

## Throws

[AuthError—](./../errors.md#autherror) Thrown if the Hook is used outside the Provider Scope.

#### Defined in

[higherOrderComponents/withIsAuthenticated.tsx](https://github.com/react-auth-kit/react-auth-kit/blob/37dc30d4/packages/react-auth-kit/src/higherOrderComponents/withIsAuthenticated.tsx#L39)

---

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">MIT License</a> code</i></p>
