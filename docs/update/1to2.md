# Update Auth Kit from v1 to v2

## What's changed

- React Auth Kit v2 comes with the support of `React Router v6`.
- React Auth Kit v2 stops using the `PrivateRoute` component.
- React Auth Kit v2 introduces new component named `RequireAuth`.
- `RequireAuth` will replace the use-cases of `PrivateRoute`. It also will make the process easier to manage.

## Update to v2

### Component structure in v1

```jsx title="RouteComponent"
<BrowserRouter>
  <Switch>
    <Route path={'/'} component={Home} exact/>
    <Route path={'/login' } component={Login} exact/>
    <PrivateRoute path={'/secure'}
                  component={SecureComponent}
                  loginPath={'/login'} exact
    />
  </Switch>
</BrowserRouter>
```

### Component structure in v2

```jsx title="RouteComponent"
<BrowserRouter>
  <Routes>
    <Route path={'/'} element={<Home/>}/>
    <Route path={'/login' } element={<Login/>}/>
    <Route path={'/secure'} element={
        <RequireAuth loginPath={'/login'}>
          <SecureComponent/>
        </RequireAuth>
    }/>
  </Routes>
</BrowserRouter>
```

<p align="center">&mdash; 🔑  &mdash;</p>
<p align="center"><i>React Auth Kit is <a href="https://github.com/react-auth-kit/react-auth-kit/blob/master/LICENSE">Apache 2.0 License</a> code</i></p>
