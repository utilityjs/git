/**
 * Class representing a Git-related error.
 * It extends the built-in Error class to handle Git-specific error scenarios.
 */
export class GitError extends Error {
  /**
   * Create a GitError.
   * @param {string} message - The error message describing the Git issue.
   */
  constructor(message: string) {
    super(message) // Call the parent Error class constructor with the message.
    this.name = "GitError" // Set the error name to 'GitError' to distinguish it from other errors.
  }
}
