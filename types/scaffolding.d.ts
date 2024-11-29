/* eslint-disable @typescript-eslint/no-explicit-any */
export type AnyFunction = (...payload: any[]) => unknown
export type None = Record<string, never>

export type IsExact<A, B> = A extends B ? (B extends A ? true : false) : false;
export type IsTilda<A> = IsExact<A, '~'>;

export type If<Condition, Then, Else> = Condition extends true ? Then : Else;
