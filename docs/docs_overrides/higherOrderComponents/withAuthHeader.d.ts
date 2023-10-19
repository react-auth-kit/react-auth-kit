/**
 *
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Authentication header <Higher Order Component>
 * @copyright Arkadip Bhattacharya 2020
 *
 */
import * as React from 'react';
/**
 * @interface withAuthHeaderProps
 */
interface withAuthHeaderProps {
    authHeader: string;
}
/**
 * @public
 * @function
 * @name withAuthHeader
 * @description Inject Authentication Header inside the Component's Prop
 * @param Component - React Component
 */
declare function withAuthHeader<P extends withAuthHeaderProps>(Component: React.ComponentType<P>): React.FunctionComponent<P>;
/**
  *@exports withAuthHeader
  */
export default withAuthHeader;
