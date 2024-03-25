import {
  afterAll,
  assert,
  assertEquals,
  assertStringIncludes,
  beforeAll,
  describe,
  it,
  path,
} from "../test_deps.ts";

import { GitError, GITUtility } from "../mod.ts";

const TMP_RESOURCES_PATH = path.normalize(
  import.meta.dirname + "/resources/tmp"
);

describe("git", function () {
  let runCommandTestRepo: GITUtility;

  beforeAll(async () => {
    await Deno.mkdir(TMP_RESOURCES_PATH, { recursive: true });
    await Deno.mkdir(path.normalize(TMP_RESOURCES_PATH + "/run_command_test"), {
      recursive: true,
    });
    runCommandTestRepo = new GITUtility(
      path.normalize(TMP_RESOURCES_PATH + "/run_command_test")
    );
    await runCommandTestRepo.runCommand("init");
  });

  afterAll(async () => {
    await Deno.remove(TMP_RESOURCES_PATH, { recursive: true });
  });

  it("runCommand(): positive", async () => {
    const output = await runCommandTestRepo.runCommand("status");
    assertStringIncludes(
      output,
      "No commits yet",
      "Git repository is expected to not have any commits"
    );
  });

  it("runCommand(): negative", async () => {
    try {
      await runCommandTestRepo.runCommand("invalid_command");
      assert(true, "Command is expected to fail");
    } catch (e) {
      assert(e instanceof GitError, "Command is expected to fail");
    }
  });

  it("hasUncommittedChanges(): positive", async () => {
    const hasChanges = await runCommandTestRepo.hasUncommittedChanges();
    assertEquals(hasChanges, false, "Command is expected to fail");
  });

  it("#checkoutRepository()", async () => {
    await new GITUtility(TMP_RESOURCES_PATH).clone(
      "https://github.com/utilityjs/git-test.git"
    );
    assertEquals(await _exists(TMP_RESOURCES_PATH + "/git-test"), true);
  });
});

/*
 * Check if file or directory existing in given path.
 */
export async function _exists(filePath: string): Promise<boolean> {
  try {
    await Deno.stat(filePath);
    // successful, file or directory must exist
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      // file or directory does not exist
      return false;
    } else {
      // unexpected error, maybe permissions, pass it along
      throw error;
    }
  }
}
