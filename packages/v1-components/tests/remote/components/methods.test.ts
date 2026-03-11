import type { UiDatePicker } from '@/remote/components/date-picker'
import type { UiSelectPopper, UiSelectTrigger } from '@/remote/components/select/parts'
import type { UiTextbox } from '@/remote/components/textbox'
import type { UiTimePicker } from '@/remote/components/time-picker'

import { describe, expectTypeOf, test } from 'vitest'

describe('remote component method typing', () => {
  test('exposes typed UiTextbox host methods on instance refs', () => {
    type Instance = InstanceType<typeof UiTextbox>

    expectTypeOf<Instance['getSelectionStart']>().toEqualTypeOf<() => Promise<number | null>>()
    expectTypeOf<Instance['getSelectionEnd']>().toEqualTypeOf<() => Promise<number | null>>()
    expectTypeOf<Instance['setSelectionRange']>().toEqualTypeOf<(start: number, end: number) => Promise<void>>()
    expectTypeOf<Instance['focus']>().toEqualTypeOf<() => Promise<void>>()
    expectTypeOf<Instance['blur']>().toEqualTypeOf<() => Promise<void>>()
    expectTypeOf<Instance['select']>().toEqualTypeOf<() => Promise<void>>()
    expectTypeOf<Instance['insert']>().toEqualTypeOf<(value: string) => Promise<void>>()
    expectTypeOf<Instance['clear']>().toEqualTypeOf<() => Promise<void>>()
  })

  test('exposes typed UiDatePicker host methods on instance refs', () => {
    type Instance = InstanceType<typeof UiDatePicker>

    expectTypeOf<Instance['open']>().toEqualTypeOf<() => Promise<void>>()
    expectTypeOf<Instance['close']>().toEqualTypeOf<() => Promise<void>>()
    expectTypeOf<Instance['toggle']>().toEqualTypeOf<() => Promise<void>>()
  })

  test('exposes typed UiTimePicker host methods on instance refs', () => {
    type Instance = InstanceType<typeof UiTimePicker>

    expectTypeOf<Instance['open']>().toEqualTypeOf<() => Promise<void>>()
    expectTypeOf<Instance['close']>().toEqualTypeOf<() => Promise<void>>()
    expectTypeOf<Instance['focus']>().toEqualTypeOf<() => Promise<void>>()
  })

  test('exposes typed UiSelectTrigger host methods on instance refs', () => {
    type Instance = InstanceType<typeof UiSelectTrigger>

    expectTypeOf<Instance['open']>().toEqualTypeOf<() => Promise<void>>()
    expectTypeOf<Instance['close']>().toEqualTypeOf<() => Promise<void>>()
    expectTypeOf<Instance['onClick']>().toEqualTypeOf<(event?: MouseEvent) => Promise<void>>()
    expectTypeOf<Instance['onKeyDown']>().toEqualTypeOf<(event: KeyboardEvent) => Promise<void>>()
    expectTypeOf<Instance['onInput']>().toEqualTypeOf<(event: Event) => Promise<void>>()
    expectTypeOf<Instance['onFocus']>().toEqualTypeOf<(event: Event) => Promise<void>>()
    expectTypeOf<Instance['onBlur']>().toEqualTypeOf<(event: Event) => Promise<void>>()
    expectTypeOf<Instance['onClear']>().toEqualTypeOf<(event: MouseEvent) => Promise<void>>()
  })

  test('exposes typed UiSelectPopper host methods on instance refs', () => {
    type Instance = InstanceType<typeof UiSelectPopper>

    expectTypeOf<Instance['autoScroll']>().toEqualTypeOf<() => Promise<void>>()
    expectTypeOf<Instance['updateWidth']>().toEqualTypeOf<() => Promise<void>>()
  })
})
