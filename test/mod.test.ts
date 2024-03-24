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

const TEST_RESOURCES_PATH = path.normalize(import.meta.dirname + "/resources");
const TMP_RESOURCES_PATH = path.normalize(
  import.meta.dirname + "/resources/tmp"
);

describe("git", function () {
  let tmpFolderGit: GITUtility;

  beforeAll(async () => {
    await Deno.mkdir(TMP_RESOURCES_PATH, { recursive: true });
    tmpFolderGit = new GITUtility(TMP_RESOURCES_PATH);
    await tmpFolderGit.runCommand("init");
  });

  afterAll(async () => {
    await Deno.remove(TEST_RESOURCES_PATH, { recursive: true });
  });

  it("runCommand(): positive", async () => {
    const output = await tmpFolderGit.runCommand("status");
    assertStringIncludes(
      output,
      "No commits yet",
      "Git repository is expected to not have any commits"
    );
  });

  it("runCommand(): negative", async () => {
    try {
      await tmpFolderGit.runCommand("invalid_command");
      assert(true, "Command is expected to fail");
    } catch (e) {
      assert(e instanceof GitError, "Command is expected to fail");
    }
  });

  it("hasUncommittedChanges(): positive", async () => {
    const hasChanges = await tmpFolderGit.hasUncommittedChanges();
    assertEquals(hasChanges, false, "Command is expected to fail");
  });
});
