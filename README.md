# @utility/date

A Date utility library


```shell
deno add @utility/date
```

Example

```typescript
import { isISODate } from "@utility/date";

isISODate("2022-12-27T07:40:25.551Z");
// => true

isISODate("25/12/2022");
// => false
```
