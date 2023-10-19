/**
 *
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Sign Out functionality <Higher Order Component>
 * @copyright Arkadip Bhattacharya 2020
 *
 */
import * as React from 'react';
/**
 * @interface withSignOutProps
 */
interface withSignOutProps {
    signOut(): boolean;
}
/**
 * @public
 * @function
 * @name withSignOut
 * @description Inject sign Out functionality inside the Component's Prop
 * @param Component
 */
declare function withSignOut<P extends withSignOutProps>(Component: React.ComponentType<P>): React.FunctionComponent<P>;
export default withSignOut;
