<h1 align="center">
@auth-kit/react-router
</h1>

<p align="center">
<a href="https://codecov.io/gh/react-auth-kit/react-auth-kit">
  <img src="https://codecov.io/gh/react-auth-kit/react-auth-kit/branch/master/graph/badge.svg?token=H188T7PXLL" alt="CodeCov coverage"/>
</a>
<a href="https://www.npmjs.com/package/@auth-kit/react-router">
    <img src="https://img.shields.io/npm/v/@auth-kit/react-router.svg?logo=npm" alt="Test Suites">
</a>
<a href="https://bundlephobia.com/result?p=react-auth-kit">
    <img src="https://img.shields.io/bundlephobia/minzip/%40auth-kit/react-router?style=flat-square" alt="Test Suites">
</a>
</p>

<h2 align="center">
<a href="https://authkit.arkadip.dev">
    https://authkit.arkadip.dev 🚀
</a>
</h2>


<p align="center">
  <em>🔑 This library is a part of the `react-auth-kit` ecosystem.  🔑</em>

  This library contains useful functions to manage private routes using _react-router_* or *react-router-dom*.
</p>


## Usage

### AuthOutlet
AuthOutlet provides an easy solution using *react-router* or *react-router-dom* to manage private-route.

Routes inside the `AuthOutlet` will stay protected and only properly authenticated users can access the route.

If the user is not authenticated then the user will be redirected to the `fallbackPath`.

#### Example

```jsx
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';

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

### RequireAuth

RequireAuth provides a per route base private route solution to implement a private route solution.

Component inside the `RequireAuth` will stay protected and only properly authenticated users can access the route.

If the user is not authenticated then the user will be redirected to the `fallbackPath`.


#### Example

```jsx
import RequireAuth from '@auth-kit/react-router/RequireAuth';

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

## Reference

[Reference](https://authkit.arkadip.dev/reference/react-router/requireauth/)

---

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">MIT License</a> code</i></p>
