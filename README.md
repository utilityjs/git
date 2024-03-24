# @utility/date

A module providing git utility functions.


```shell
deno add @utility/git
```

Example

```typescript
import { GITUtility } from "@utility/git";

await new GITUtility("./git-repo-folder/").hasUncommittedChanges();
// => true
```
