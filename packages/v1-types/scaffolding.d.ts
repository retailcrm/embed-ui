export type IsExact<A, B> = A extends B ? (B extends A ? true : false) : false;
export type IsTilda<A> = IsExact<A, '~'>;

export type If<Condition, Then, Else> = Condition extends true ? Then : Else;

export type Maybe<T> = T | null

export type UnionToArray<T, U = T> = [T] extends [never]
  ? []
  : T extends T
  ? [T, ...UnionToArray<Exclude<U, T>>]
  : []