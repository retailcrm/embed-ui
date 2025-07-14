import type { Pojo } from '@retailcrm/embed-ui-v1-types/scaffolding'

export type Callable = {
  httpCall (
    action: string,
    payload?: string | Pojo
  ): Promise<{ body: string; status: number }>;
}
