export type {
  Runner as PageRunner,
  RunIdentity as PageRunIdentity,
} from './remote/pages'

export type {
  RunConfig as WidgetRunConfig,
  RunIdentity as WidgetRunIdentity,
  Runner as WidgetRunner,
} from './remote/widgets'

export { defineRunner as definePageRunner } from './remote/pages'
export { defineRunner as defineWidgetRunner } from './remote/widgets'

export {
  createEndpoint,
  defineRunner,
} from './remote/endpoint'
export { runEndpoint } from './remote/worker'
