/**
 * @packageDocumentation
 *
 * Utility Module
 *
 * It contains all the utility functions
 *
 */

import {
  AuthKitStateInterface,
} from '../types';

/**
 *
 * @param auth - The Auth Object
 * @returns A boolean value indicting if currently authenticated or not
 *
 * @internal
 *
 * @typeParam T - Type of User State Object
 */
function isAuthenticated<T>(auth: AuthKitStateInterface<T>) : boolean {
  if (auth.auth) {
    return new Date(auth.auth.expiresAt) > new Date();
  }
  return false;
}

export {isAuthenticated};
