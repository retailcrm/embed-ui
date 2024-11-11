declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<
    object,
    NonNullable<unknown>,
    unknown
  >

  export default component
}
