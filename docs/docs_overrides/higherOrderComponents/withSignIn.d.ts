/**
 *
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Sign In functionality <Higher Order Component>
 * @copyright Arkadip Bhattacharya 2020
 *
 */
import * as React from 'react';
import { signInFunctionParams } from '../types';
/**
 * @interface withSignInProps
 */
interface withSignInProps {
    signIn(params: signInFunctionParams): boolean;
}
/**
 * @public
 * @function
 * @name withSignIn
 * @description Inject sign in functionality inside the Component's Prop
 * @param Component
 */
declare function withSignIn<P extends withSignInProps>(Component: React.ComponentType<P>): React.FunctionComponent<P>;
export default withSignIn;
