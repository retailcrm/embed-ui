import type { Component, CreateAppFunction } from 'vue'

import type { Channel } from '@omnicajs/vue-remote/dist/remote'

import type { Pinia } from 'pinia'

import type { RemoteRoot, SchemaOf } from '@omnicajs/vue-remote/remote'

import type {
  TargetList,
  TargetName,
} from '@retailcrm/embed-ui-v1-endpoint/common/targets'

export interface WidgetRunner {
  run(
    createApp: CreateAppFunction<
      | Component<RemoteRoot<SchemaOf<string>>>
      | RemoteRoot<SchemaOf<string>>
    >,
    root: RemoteRoot<SchemaOf<string>>,
    pinia: Pinia,
    target: WidgetTarget
  ): Promise<() => void>;
}

export interface WidgetEndpoint {
  run (channel: Channel, target: WidgetTarget): Promise<void>;
  release (): void;
}

export type WidgetTarget = TargetName

export type SchemaListOf<T extends WidgetTarget> = SchemaListByTarget[T]
export type SchemaListByTarget = TargetList
