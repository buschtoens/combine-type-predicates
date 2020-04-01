/**
 * @see https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
 *
 * Big thanks to @dfreeman (Dan Freeman) for helping with this!
 * @see https://discordapp.com/channels/480462759797063690/484421406659182603/694852926572593253
 */

/**
 * Retrieves the predicate type of a user-defined type predicate function.
 * Like `ReturnType<T>`, but for type predicate functions.
 *
 * @example
 * ```ts
 * type Foo = PredicateType<(subject: unknown) => is { foo: string }>;
 * // => { foo: string }
 * ```
 */
export type PredicateType<T extends (subject: unknown) => unknown> = T extends (
  subject: unknown
) => subject is infer Type
  ? Type
  : never;

/**
 * Create a tuple of type predicate functions from the specified types.
 *
 * @example
 * ```ts
 * type StringNumber = Predicates<[string, number]>;
 * // => [
 * //  (v: unknown) => v is string,
 * //  (v: unknown) => v is number
 * // ]
 * ```
 */
type Predicates<T extends unknown[]> = {
  [K in keyof T]: (subject: unknown) => subject is T[K];
} &
  unknown[];

/**
 * Converts a union type (`A | B`) to an intersection type (`A & B`).
 */
type UnionToIntersection<T> = (T extends T ? (p: T) => void : never) extends (
  p: infer U
) => void
  ? U
  : never;

/**
 * Gets all values of a tuple as a union type (`A | B`).
 *
 * @example
 * ```ts
 * type StringOrNumber = UnionOf<[string, number]>; // => string | number
 * ```
 */
type UnionOf<T extends unknown[]> = T[keyof T & number];

/**
 * Gets all values of a tuple as an intersection type (`A & B`).
 *
 * @example
 * ```
 * type FooAndBar = IntersectionOf<[{ foo: string }, { bar: string }]>;
 * ```
 */
type IntersectionOf<T extends unknown[]> = UnionToIntersection<UnionOf<T>>;

/**
 * Combines a list of type predicate functions into a union type guard.
 *
 * @example
 * ```ts
 * type Foo = { foo: boolean; baz: number };
 * type Bar = { bar: symbol; baz: string };
 *
 * declare function isFoo(v: unknown): v is Foo;
 * declare function isBar(v: unknown): v is Bar;
 *
 * const isFooOrBar = isSome(isFoo, isBar);
 * // => (subject: unknown) => subject is Foo | Bar
 * ```
 */
export const isSome = <Types extends unknown[]>(
  ...predicates: Predicates<Types>
) => (subject: unknown): subject is UnionOf<Types> =>
  predicates.some(is => is(subject));

/**
 * Combines a list of type predicate functions into an intersection type guard.
 *
 * @example
 * ```ts
 * type Foo = { foo: boolean; baz: number };
 * type Bar = { bar: symbol; baz: string };
 *
 * declare function isFoo(v: unknown): v is Foo;
 * declare function isBar(v: unknown): v is Bar;
 *
 * const isFooAndBar = isEvery(isFoo, isBar);
 * // => (subject: unknown) => subject is Foo & Bar
 * ```
 */
export const isEvery = <Types extends unknown[]>(
  ...predicates: Predicates<Types>
) => (subject: unknown): subject is IntersectionOf<Types> =>
  predicates.every(is => is(subject));
