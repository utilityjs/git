/**
 * @module
 * A module providing git utility functions.
 *
 * @example
 * ```ts
 * import { GITUtility } from "@utility/git";
 *
 * await new GITUtility("./git-repo-folder/").hasUncommittedChanges();
 * // => true
 * ```
 */

export * from "./src/git.ts";
export { GitError } from "./src/GitError.ts";
