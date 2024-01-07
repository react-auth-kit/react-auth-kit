/**
 * Base Error Class for all the auth kit related errors.
 */
export class AuthError extends Error {
  /**
   * @param message - Error Message to be shown to the developer.
   */
  constructor(message: string) {
    super(message);
  }
}
