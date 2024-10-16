/* eslint-disable @typescript-eslint/no-explicit-any */
export type AnyFunction = (...payload: any[]) => unknown
export type None = Record<string, never>

type IsExact<A, B> = A extends B ? (B extends A ? true : false) : false;
type IsTilda<A> = IsExact<A, '~'>;

type If<Condition, Then, Else> = Condition extends true ? Then : Else;
