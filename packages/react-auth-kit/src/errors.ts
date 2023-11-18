/**
 *
 * @author Arkadip Bhattacharya <hi@arkadip.dev>
 * @fileoverview Error file
 * @copyright Arkadip Bhattacharya 2023
 *
 */

/**
 * @class
 * @name AuthError
 * @extends Error
 *
 * General Auth kit error class
 */
export class AuthError extends Error {
  /**
     * @constructor
     * @param message - Error message
     */
  constructor(message: string) {
    super(message);
  }
}
