// noinspection JSDeprecatedSymbols

import type {ReactNode} from "react";
import {Outlet} from 'react-router';

import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';


/**
 * AuthOutlet provides an easy solution to implement private
 * route solutions using the react-router-dom route system
 *
 * @example
 *
 * ```jsx
 * function App() {
 *  return (
 *    <Router>
 *      <Routes>
 *        <Route element={<AuthOutlet fallbackPath='/login' />}>
 *          <Route path='/' element={<Users/>} />
 *          <Route path='/products' element={<Products/>} />
 *        </Route>
 *        <Route path='/login' element={<Login/>}/>
 *      </Routes>
 *    </Router>
 *  );
 * }
 * ```
 */
function AuthOutlet(): ReactNode {
  useIsAuthenticated();
  return <Outlet />;
}

export default AuthOutlet;
