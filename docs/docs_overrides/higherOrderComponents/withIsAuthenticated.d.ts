/**
 *
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Authentication Status <Higher Order Component>
 * @copyright Arkadip Bhattacharya 2020
 *
 */
import * as React from 'react';
/**
 * @interface withAuthHeaderProps
 */
interface withAuthHeaderProps {
    isAuth: string;
}
/**
 * @public
 * @function
 * @name withIsAuthenticated
 * @description Inject Authentication status inside the Component's Prop
 * @param Component
 */
declare function withIsAuthenticated<P extends withAuthHeaderProps>(Component: React.ComponentType<P>): React.FunctionComponent<P>;
export default withIsAuthenticated;
