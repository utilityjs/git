import { GitError } from "./GitError.ts";

export class GITUtility {
  readonly #cwd: string;

  constructor(cwd?: string) {
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
   * gitUtility.runCommand("status");
   * // => On branch master
   *
   * No commits yet
   *
   * Changes to be committed:
   *   (use "git rm --cached <file>..." to unstage)
   *         new file:   .editorconfig
   * ```
   */
  async runCommand(...args: string[]): Promise<string> {
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
   * Checking is there are uncommitted changes on current working directory
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
    const status = await this.runCommand("status", "--porcelain");
    return status !== "";
  }

  /**
   * Clones repository into current working directory using the url provided.
   *
   * @param {string} repositoryUrl Repository url
   * @return { Promise<void>}
   * @example
   * ```ts
   * await gitUtility.clone("https://github.com/utilityjs/git-test.git");
   * // => true
   * ```
   */
  async clone(repositoryUrl: string): Promise<void> {
    await this.runCommand("clone", repositoryUrl);
  }
}
