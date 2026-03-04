import type { Pojo } from './scaffolding'

export type HostApi = {
  goTo (route: string, params?: Record<string, unknown>): void;

  httpCall (
    action: string,
    payload?: string | Pojo
  ): Promise<{ body: string; status: number }>;
}
