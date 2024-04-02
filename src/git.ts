import { GitError } from "./GitError.ts"

/**
 * Utility class for executing Git commands within a Deno environment.
 */
export class GITUtility {
  // Private field to store the current working directory
  readonly #cwd: string

  /**
   * Constructs a GITUtility instance, optionally setting the current working directory.
   * @param {string} [cwd] - The current working directory for Git operations. Defaults to Deno's current directory.
   */
  constructor(cwd?: string) {
    if (cwd) this.#cwd = cwd
    else this.#cwd = Deno.cwd()
  }

  /**
   * Executes a Git command and returns the output as a string.
   * @param {...string} args - The arguments for the Git command.
   * @returns {Promise<string>} The output from the Git command.
   * @throws {GitError} Throws a GitError if the Git command fails.
   * @example
   * const gitUtility = new GITUtility();
   * const status = await gitUtility.runCommand("status");
   * console.log(status); // Outputs the status of the Git repository.
   */
  async runCommand(...args: string[]): Promise<string> {
    const command = new Deno.Command("git", {
      args: [...args],
      cwd: this.#cwd,
      stdout: "piped",
      stderr: "piped",
    })

    const { code, stdout, stderr } = await command.output()

    if (code !== 0) {
      throw new GitError(
        `Failed to run \`git ${args.join(" ")}\`: ${new TextDecoder().decode(
          stderr
        )}`
      )
    }

    return new TextDecoder().decode(stdout)
  }

  /**
   * Checks if there are uncommitted changes in the current working directory.
   * @returns {Promise<boolean>} True if there are uncommitted changes, false otherwise.
   * @example
   * const gitUtility = new GITUtility();
   * const hasChanges = await gitUtility.hasUncommittedChanges();
   * console.log(hasChanges); // Outputs true if there are changes, false otherwise.
   */
  async hasUncommittedChanges(): Promise<boolean> {
    const status = await this.runCommand("status", "--porcelain")
    return status !== ""
  }

  /**
   * Clones a Git repository into the current working directory.
   * @param {string} repositoryUrl - The URL of the repository to clone.
   * @returns {Promise<void>}
   * @example
   * const gitUtility = new GITUtility();
   * await gitUtility.clone("https://github.com/utilityjs/git-test.git");
   * // Clones the specified repository into the current working directory.
   */
  async clone(repositoryUrl: string): Promise<void> {
    await this.runCommand("clone", repositoryUrl)
  }
}
