# combine-type-predicates

[![CI](https://github.com/buschtoens/combine-type-predicates/workflows/CI/badge.svg)](https://github.com/buschtoens/combine-type-predicates/actions)
[![npm version](https://badge.fury.io/js/combine-type-predicates.svg)](http://badge.fury.io/js/combine-type-predicates)
[![Download Total](https://img.shields.io/npm/dt/combine-type-predicates.svg)](http://badge.fury.io/js/combine-type-predicates)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)  
[![Dependabot enabled](https://img.shields.io/badge/dependabot-enabled-blue.svg?logo=dependabot)](https://dependabot.com/)
[![dependencies Status](https://david-dm.org/buschtoens/combine-type-predicates/status.svg)](https://david-dm.org/buschtoens/combine-type-predicates)
[![devDependencies Status](https://david-dm.org/buschtoens/combine-type-predicates/dev-status.svg)](https://david-dm.org/buschtoens/combine-type-predicates?type=dev)

Combine [user-defined type guards / type predicates][user-defined-type-guards]
as [unions][union] and [intersections][intersection].

[user-defined-type-guards]: https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
[union]: https://www.typescriptlang.org/docs/handbook/advanced-types.html#union-types
[intersection]: https://www.typescriptlang.org/docs/handbook/advanced-types.html#intersection-types

```ts
import { isSome, isEvery } from 'combine-type-predicates';

type Foo = { foo: boolean; baz: number };
type Bar = { bar: symbol; baz: string };

const isFoo = (v: unknown): v is Foo
  => typeof v.foo === 'boolean' && v.baz === 'number';
const isBar = (v: unknown): v is Bar
  => typeof v.bar === 'symbol' && v.baz === 'string';

const isFooOrBar = isSome(isFoo, isBar);
// => (subject: unknown) => subject is Foo | Bar

const isFooAndBar = isEvery(isFoo, isBar);
// => (subject: unknown) => subject is Foo & Bar

const x: unknown = undefined;

if (isFooOrBar(x)) {
  x.baz; // => string | number

  if ('foo' in x) {
    x.foo; // => boolean
  } else {
    x.bar; // => symbol
  }
}

if (isFooAndBar(x)) {
  x.foo; // => boolean
  x.bar; // => symbol
  x.baz; // => never (no such thing as `string & number`)
}
```
