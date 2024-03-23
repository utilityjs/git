import { GitError } from "./GitError.ts";

/**
 * Check if provided string is valid iso date
 *
 * @param {string} value The value to check.
 * @return {boolean} Returns `true` if `value` is a valid iso date, else `false`.
 * @example
 * ```ts
 * isISODate("2022-12-27T07:40:25.551Z");
 * // => true
 *
 * isISODate("25/12/2022");
 * // => false
 * ```
 */
export async function runGitCommand(...args: string[]): Promise<string> {
  const command = new Deno.Command("git", {
    args: [...args],
    stdout: "piped",
    stderr: "piped",
  });

  const { code, stdout, stderr } = await command.output();

  if (code !== 0) {
    throw new GitError(
      `Failed to run \`git ${args.join(" ")}\`: ${new TextDecoder().decode(
        stderr
      )}`
    );
  }

  return new TextDecoder().decode(stdout);
}
