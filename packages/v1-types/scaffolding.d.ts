// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any[]) => any
export type AnyFunctionList = { [name: string]: AnyFunction; }

export type IsExact<A, B> = A extends B ? (B extends A ? true : false) : false;
export type IsTilda<A> = IsExact<A, '~'>;

export type If<Condition, Then, Else> = Condition extends true ? Then : Else;

export type Maybe<T> = T | null
export type MaybePromise<T> = T | Promise<T>

export type None = Record<string, never>

export type Scalar = string | number | boolean | null | undefined
export type Pojo = {
  [key: string]: Scalar | Pojo | Array<Scalar | Pojo>
}

export type Predicate<T = unknown> = (value: unknown) => value is T

export type Simplify<T> = { [K in keyof T]: T[K] }

export type UnionToArray<T, U = T> = [T] extends [never]
  ? []
  : T extends T
  ? [T, ...UnionToArray<Exclude<U, T>>]
  : []
