---
title: AuthOutlet - react-router - React Auth Kit
description: "@auth-kit/react-router/AuthOutlet"
---

# AuthOutlet

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" id="ref_AuthOutlet"></div>

## Import

```js
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
```

## Function Signature

**AuthOutlet**(`#!js {fallbackPath: string}`): `React.ReactNode`

AuthOutlet provides an easy solution to implement private route solutions using the react-router-dom route system

## Parameters

| Name           | Type     | Description                                       |
|:---------------|:---------|:--------------------------------------------------|
| `fallbackPath` | `string` | Path to redirect if the user is not authenticated |

## Example

```jsx
function App() {
 return (
   <Router>
     <Routes>
       <Route element={<AuthOutlet fallbackPath='/login' />}>
         <Route path='/' element={<Users/>} />
         <Route path='/products' element={<Products/>} />
       </Route>
       <Route path='/login' element={<Login/>}/>
     </Routes>
   </Router>
 );
}
```

#### Defined in

[packages/react-router/src/AuthOutlet.tsx](https://github.com/react-auth-kit/react-auth-kit)

---

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">MIT License</a> code</i></p>
