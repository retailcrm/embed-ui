import type { VueWrapper } from '@vue/test-utils'

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
} from 'vitest'

import { mount } from '@vue/test-utils'

import UiSlider from '@/host/components/slider/UiSlider.vue'

type BoundingRect = {
  left: number;
  width: number;
}

const createRect = ({ left, width }: BoundingRect) => ({
  left,
  width,
  top: 0,
  right: left + width,
  bottom: 6,
  x: left,
  y: 0,
  height: 6,
  toJSON: () => ({}),
})

describe('host/components/slider', () => {
  let el: HTMLElement | null = null
  let wrapper: VueWrapper | null = null
  const initialResizeObserver = (globalThis as { ResizeObserver?: typeof ResizeObserver }).ResizeObserver

  const setTrackRect = (rect: BoundingRect) => {
    const track = wrapper?.find('.ui-v1-slider__track').element as HTMLElement | undefined
    if (!track) return

    Object.defineProperty(track, 'getBoundingClientRect', {
      value: () => createRect(rect),
      configurable: true,
    })
  }

  const createComponent = (options = {}) => {
    wrapper = mount(UiSlider, {
      attachTo: el as HTMLElement,
      ...options,
    })
  }

  beforeEach(() => {
    el = document.createElement('div')
    document.body.appendChild(el)

    Object.defineProperty(globalThis, 'ResizeObserver', {
      value: class ResizeObserverMock {
        _callback: ResizeObserverCallback

        constructor (callback: ResizeObserverCallback) {
          this._callback = callback
        }

        observe () {}
        unobserve () {}
        disconnect () {}
      },
      configurable: true,
    })
  })

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null

    el?.remove()
    el = null

    if (initialResizeObserver) {
      Object.defineProperty(globalThis, 'ResizeObserver', {
        value: initialResizeObserver,
        configurable: true,
      })
    } else {
      Object.defineProperty(globalThis, 'ResizeObserver', {
        value: undefined,
        configurable: true,
      })
    }
  })

  test('renders correctly and updates with type single', async () => {
    createComponent({
      props: { value: 20 },
    })

    const handles1 = wrapper?.findAll('.ui-v1-slider__handle') ?? []
    expect(handles1).toHaveLength(1)
    expect((handles1[0].element as HTMLElement).style.left).toBe('20%')

    const filler1 = wrapper?.find('.ui-v1-slider__filler')
    expect(filler1?.exists()).toBe(true)
    expect((filler1?.element as HTMLElement).style.left).toBe('0%')
    expect((filler1?.element as HTMLElement).style.width).toBe('20%')

    await wrapper?.setProps({ value: 40 })

    const handles2 = wrapper?.findAll('.ui-v1-slider__handle') ?? []
    expect(handles2).toHaveLength(1)
    expect((handles2[0].element as HTMLElement).style.left).toBe('40%')

    const filler2 = wrapper?.find('.ui-v1-slider__filler')
    expect(filler2?.exists()).toBe(true)
    expect((filler2?.element as HTMLElement).style.left).toBe('0%')
    expect((filler2?.element as HTMLElement).style.width).toBe('40%')
  })

  test('renders correctly and updates with type range', async () => {
    createComponent({
      props: {
        value: [10, 30],
        type: 'range',
      },
    })

    const handles1 = wrapper?.findAll('.ui-v1-slider__handle') ?? []
    expect(handles1).toHaveLength(2)
    expect((handles1[0].element as HTMLElement).style.left).toBe('10%')
    expect((handles1[1].element as HTMLElement).style.left).toBe('30%')

    const filler1 = wrapper?.find('.ui-v1-slider__filler')
    expect(filler1?.exists()).toBe(true)
    expect((filler1?.element as HTMLElement).style.left).toBe('10%')
    expect((filler1?.element as HTMLElement).style.width).toBe('20%')

    await wrapper?.setProps({ value: [0, 80] })

    const handles2 = wrapper?.findAll('.ui-v1-slider__handle') ?? []
    expect(handles2).toHaveLength(2)
    expect((handles2[0].element as HTMLElement).style.left).toBe('0%')
    expect((handles2[1].element as HTMLElement).style.left).toBe('80%')

    const filler2 = wrapper?.find('.ui-v1-slider__filler')
    expect(filler2?.exists()).toBe(true)
    expect((filler2?.element as HTMLElement).style.left).toBe('0%')
    expect((filler2?.element as HTMLElement).style.width).toBe('80%')
  })

  test('renders correctly with labelled slots', () => {
    createComponent({
      props: {
        value: 20,
        labelled: true,
      },
      slots: {
        label: ({ boundary }: { boundary: number }) => String(boundary),
        handle: ({ boundary }: { boundary: number }) => String(boundary),
      },
    })

    const handles = wrapper?.findAll('.ui-v1-slider__handle') ?? []
    expect(handles).toHaveLength(1)
    expect(handles[0].text()).toBe('20')

    const labels = wrapper?.findAll('.ui-v1-slider__label') ?? []
    expect(labels).toHaveLength(2)
    expect(labels[0].text()).toBe('0')
    expect(labels[1].text()).toBe('100')
  })

  test('updates value on track click for type single', async () => {
    createComponent({
      props: { value: 20 },
    })

    setTrackRect({ left: 10, width: 100 })
    await wrapper?.find('.ui-v1-slider').trigger('click', { clientX: 70 })

    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual([60])
  })

  test('updates nearest handle on track click for type range', async () => {
    createComponent({
      props: {
        value: [20, 80],
        type: 'range',
      },
    })

    setTrackRect({ left: 10, width: 100 })
    await wrapper?.find('.ui-v1-slider').trigger('click', { clientX: 75 })

    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual([[20, 65]])
  })

  test('updates value via drag and drop with type single', async () => {
    createComponent({
      props: { value: 20 },
    })

    setTrackRect({ left: 0, width: 100 })

    const handle = wrapper?.find('.ui-v1-slider__handle')
    await handle?.trigger('mousedown', { clientX: 20 })
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 70 }))
    window.dispatchEvent(new MouseEvent('mouseup'))

    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual([70])
  })

  test('keeps ascending order when first range handle crosses second during drag', async () => {
    createComponent({
      props: {
        value: [20, 80],
        type: 'range',
      },
    })

    setTrackRect({ left: 0, width: 100 })

    const firstHandle = wrapper?.findAll('.ui-v1-slider__handle')[0]
    await firstHandle?.trigger('mousedown', { clientX: 20 })
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 95 }))
    window.dispatchEvent(new MouseEvent('mouseup'))

    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual([[80, 95]])
  })

  test('updates value using current track geometry after slider position change', async () => {
    createComponent({
      props: { value: 0 },
    })

    let rect = { left: 100, width: 100 }
    const track = wrapper?.find('.ui-v1-slider__track').element as HTMLElement
    Object.defineProperty(track, 'getBoundingClientRect', {
      value: () => createRect(rect),
      configurable: true,
    })

    await wrapper?.find('.ui-v1-slider').trigger('click', { clientX: 125 })
    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual([25])

    await wrapper?.setProps({ value: 25 })

    rect = { left: 200, width: 200 }

    const handle = wrapper?.find('.ui-v1-slider__handle')
    await handle?.trigger('mousedown', { clientX: 250 })
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 260 }))
    window.dispatchEvent(new MouseEvent('mouseup'))

    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual([30])
  })

  test('supports keyboard for single slider', async () => {
    createComponent({
      props: { value: 20 },
    })

    await wrapper?.find('.ui-v1-slider').trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual([21])

    await wrapper?.find('.ui-v1-slider').trigger('keydown', { key: 'PageDown' })
    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual([10])

    await wrapper?.find('.ui-v1-slider').trigger('keydown', { key: 'End' })
    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual([100])
  })

  test('supports keyboard for range handles', async () => {
    createComponent({
      props: {
        value: [10, 30],
        type: 'range',
      },
    })

    const handles = wrapper?.findAll('.ui-v1-slider__handle') ?? []

    await handles[1].trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual([[10, 31]])

    await handles[0].trigger('keydown', { key: 'Home' })
    expect(wrapper?.emitted('update:value')?.at(-1)).toEqual([[0, 30]])
  })

  test('sets expected aria roles for single and range modes', async () => {
    createComponent({
      props: { value: 20 },
    })

    const singleRoot = wrapper?.find('.ui-v1-slider')
    expect(singleRoot?.attributes('role')).toBe('slider')
    expect(singleRoot?.attributes('tabindex')).toBe('0')
    expect(singleRoot?.attributes('aria-valuenow')).toBe('20')

    await wrapper?.setProps({
      type: 'range',
      value: [10, 30],
    })

    const rangeRoot = wrapper?.find('.ui-v1-slider')
    expect(rangeRoot?.attributes('role')).toBe('group')

    const handles = wrapper?.findAll('.ui-v1-slider__handle') ?? []
    expect(handles).toHaveLength(2)
    expect(handles[0].attributes('role')).toBe('slider')
    expect(handles[1].attributes('role')).toBe('slider')
    expect(handles[0].attributes('tabindex')).toBe('0')
    expect(handles[1].attributes('tabindex')).toBe('0')
  })
})
