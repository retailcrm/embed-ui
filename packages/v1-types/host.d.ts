import type { Pojo, Scalar } from './scaffolding'

export type HostQueryInputValue = Scalar | Scalar[]
export type HostQueryInput = Record<string, HostQueryInputValue>

export type HostQueryValue = string | string[]
export type HostQuery = Record<string, HostQueryValue>

export type HostLocation = {
  pathname: string;
  search: string;
  hash: string;
  query: HostQuery;
}

export type HostQueryOptions = {
  preserveExisting?: boolean;
}

export type HostApi = {
  goTo (route: string, params?: Record<string, unknown>): void;

  httpCall (
    action: string,
    payload?: string | Pojo
  ): Promise<{ body: string; status: number }>;

  getLocation (): HostLocation;

  replaceQuery (query: HostQueryInput, options?: HostQueryOptions): void;

  pushQuery (query: HostQueryInput, options?: HostQueryOptions): void;
}
