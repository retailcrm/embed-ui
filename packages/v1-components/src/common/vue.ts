import type { DefineComponent as _DefineComponent } from 'vue'

import type {
  Component,
  ComponentOptionsMixin,
  ComponentPropsOptions,
  ComponentProvideOptions,
  Directive,
  EmitsOptions,
  EmitsToProps,
  ExtractPropTypes,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
} from 'vue'

export type ResolveProps<PropsOrPropOptions, E extends EmitsOptions> = Readonly<
  PropsOrPropOptions extends ComponentPropsOptions
    ? ExtractPropTypes<PropsOrPropOptions>
    : PropsOrPropOptions
> & (Record<string, never> extends E ? Record<string, never> : EmitsToProps<E>);

export type DefineComponent<
  PropsOrPropOptions = object,
  M extends MethodOptions = MethodOptions,
  E extends EmitsOptions = EmitsOptions,
  EE extends string = string,
  PP = PublicProps,
  Props = ResolveProps<PropsOrPropOptions, E>,
  Defaults = ExtractDefaultPropTypes<PropsOrPropOptions>,
  S extends SlotsType = SlotsType,
  LC extends Record<string, Component> = Record<string, Component>,
  Directives extends Record<string, Directive> = Record<string, Directive>,
  Exposed extends string = string,
  Provide extends ComponentProvideOptions = ComponentProvideOptions,
  MakeDefaultsOptional extends boolean = true,
  TypeRefs extends Record<string, unknown> = Record<string, unknown>,
  TypeEl extends Element = Element
> = _DefineComponent<
  PropsOrPropOptions,
  Record<string, never>,
  Record<string, never>,
  Record<string, never>,
  M,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  E,
  EE,
  PP,
  Props,
  Defaults,
  S,
  LC,
  Directives,
  Exposed,
  Provide,
  MakeDefaultsOptional,
  TypeRefs,
  TypeEl
>