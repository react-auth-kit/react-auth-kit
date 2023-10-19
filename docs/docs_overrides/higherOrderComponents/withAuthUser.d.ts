/**
 *
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Authentication User <Higher Order Component>
 * @copyright Arkadip Bhattacharya 2020
 *
 */
import * as React from 'react';
import { AuthStateUserObject } from '../types';
/**
 * @interface withAuthProps
 */
interface withAuthProps {
    authState: AuthStateUserObject | null;
}
/**
 * @function
 * @name withAuthUser
 * @description Inject Authenticated User's state inside the Component's Prop
 * @param Component
 */
declare function withAuthUser<P extends withAuthProps>(Component: React.ComponentType<P>): React.FunctionComponent<P>;
/**
 * @exports withAuthUser
 */
export default withAuthUser;
