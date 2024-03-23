/**
 * @module
 * A module providing date utility functions.
 *
 * @example
 * ```ts
 * isISODate("2022-12-27T07:40:25.551Z");
 * // => true
 *
 * isISODate("25/12/2022");
 * // => false
 * ```
 */

export * from "./src/git.ts";
export { GitError } from "./src/GitError.ts";
