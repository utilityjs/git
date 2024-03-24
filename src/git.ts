import { GitError } from "./GitError.ts";

export class GITUtility {
  readonly #cwd: string | URL;

  constructor(cwd: string | URL) {
    if (cwd) this.#cwd = cwd;
    else this.#cwd = Deno.cwd();
  }

  /**
   * Runs git commands
   *
   * @param {string[]} args takes args for git command
   * @return {Promise<string>} Returns git command output.
   * @example
   * ```ts
   * gitUtility.runGITCommand("status");
   * // => On branch master
   *
   * No commits yet
   *
   * Changes to be committed:
   *   (use "git rm --cached <file>..." to unstage)
   *         new file:   .editorconfig
   * ```
   */
  async runGITCommand(...args: string[]): Promise<string> {
    const command = new Deno.Command("git", {
      args: [...args],
      cwd: this.#cwd,
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

  /**
   * Runs git commands
   *
   * @param {string[]} args takes args for git command
   * @return { Promise<boolean>} Returns true if git repository as uncommited changes
   * @example
   * ```ts
   * await gitUtility.hasUncommittedChanges();
   * // => true
   * ```
   */
  async hasUncommittedChanges(): Promise<boolean> {
    const status = await this.runGITCommand("status", "--porcelain");
    return status !== "";
  }
}
