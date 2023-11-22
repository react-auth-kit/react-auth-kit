# `@auth-kit/react-router`

This library is a part of `react-auth-kit` ecosystem. 
This library contains usful function to manage private route using *react-router* or *react-router-dom*.

## Usage

### AuthOutlet

AuthOutlet provide easy solution using *react-router* or *react-router-dom* to manage private-route. 

Routes inside the `AuthOutlet` will stay protected and only properly authenticated user can access the route.

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

RequireAuth provides a per route base private route solution to implement private route solution.

Component inside the `RequireAuth` will stay protected and only properly authenticated user can access the route.

If the user is not authenticated then the user will be redirected to the `fallbackPath`.


#### Example

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

## Reference

Reference page is under work

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">MIT License</a> code</i></p>
