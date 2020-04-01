# `combine-type-predicates`

Combine [user-defined type guards / type predicates][user-defined-type-guards]
as [unions][union] and [intersections][intersection].

[user-defined-type-guards]: https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
[union]: https://www.typescriptlang.org/docs/handbook/advanced-types.html#union-types
[intersection]: https://www.typescriptlang.org/docs/handbook/advanced-types.html#intersection-types

```ts
import { isSome, isEvery } from 'combine-type-predicates';

type Foo = { foo: boolean; baz: number };
type Bar = { bar: symbol; baz: string };

declare function isFoo(v: unknown): v is Foo;
declare function isBar(v: unknown): v is Bar;

const isFooOrBar = isSome(isFoo, isBar);
// => (subject: unknown) => subject is Foo | Bar

const isFooAndBar = isEvery(isFoo, isBar);
// => (subject: unknown) => subject is Foo & Bar
```
