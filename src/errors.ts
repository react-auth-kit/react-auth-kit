/**
 * @author Arkadip Bhattacharya <in2arkadipb13@gmail.com>
 * @fileoverview Error file
 * @copyright Arkadip Bhattacharya 2023
 */

/**
 * @class
 * @name AuthKitError
 * @extends Error
 *
 * General Auth kit error class
 */
export class AuthKitError extends Error {
  /**
     * @constructor
     * @param message - Error message
     */
  constructor(message: string) {
    super(message);
  }
}
