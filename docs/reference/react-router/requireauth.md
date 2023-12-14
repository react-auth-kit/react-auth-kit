---
title: RequireAuth | react-router | React Auth Kit
description: "@auth-kit/react-router/RequireAuth"
---

# RequireAuth

<div data-ea-publisher="authkitarkadipme" data-ea-type="text" data-ea-keywords="web|react|javascript|python|database|node|mongo" id="signout"></div>

## Function Signature

**RequireAuth**(`#!js {fallbackPath: string}`): `React.ReactNode`

RequireAuth provides solution for implement auth on per component basis
for private route solution
using react-router-dom route system

## Parameters

| Name | Type | Description |
| :------ | :------ | :--------- |
| `fallbackPath` | `string` | Path to redirect if the user is not authenticated  |


## Example

```jsx
const RoutesComponent = () => {
 return (
   <BrowserRouter>
     <Routes>
       <Route path={'/'} element={<Home/>}/>
       <Route path={'/login' } element={<Login/>}/>
       <Route path={'/secure'} element={
         <RequireAuth fallbackPath={'/login'}>
           <SecureComponent/>
         </RequireAuth>
       }/>
     </Routes>
   </BrowserRouter>
 )
}
```

#### Defined in

[packages/react-router/src/RequireAuth.tsx](https://github.com/react-auth-kit/react-auth-kit)

---

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">MIT License</a> code</i></p>
