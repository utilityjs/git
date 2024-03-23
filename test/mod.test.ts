import { assert, describe, it } from "../test_deps.ts";

import { GitError, runGitCommand } from "../mod.ts";

describe("git", function () {
  it("runGitCommand(): positive", async () => {
    console.log(await runGitCommand("status"));
  });

  it("runGitCommand(): negative", async () => {
    try {
      await runGitCommand("status2");
      assert(true, "Command is expected to fail");
    } catch (e) {
      assert(e instanceof GitError, "Command is expected to fail");
    }
  });
});
