import {
  afterEach,
  describe,
  expect,
  test,
  vi,
} from 'vitest'

import {
  clamp,
  createManipulator,
  getValue,
  normalize,
} from '../../../src/common/components/slider'

type ManipulatorValue = [number] | [number, number]

const createTrack = (left: number, width: number): { root: HTMLElement; track: HTMLElement } => {
  const root = document.createElement('div')
  const track = document.createElement('div')

  root.style.position = 'relative'
  root.style.width = `${Math.max(width * 2, 200)}px`
  root.style.height = '40px'

  track.style.position = 'absolute'
  track.style.left = `${left}px`
  track.style.width = `${width}px`
  track.style.height = '6px'

  Object.defineProperty(track, 'getBoundingClientRect', {
    value: () => ({
      left,
      width,
      top: 0,
      right: left + width,
      bottom: 6,
      x: left,
      y: 0,
      height: 6,
      toJSON: () => ({}),
    }),
    configurable: true,
  })

  root.appendChild(track)
  document.body.appendChild(root)

  return { root, track }
}

describe('common/components/slider', () => {
  const initialResizeObserver = (globalThis as { ResizeObserver?: typeof ResizeObserver }).ResizeObserver

  afterEach(() => {
    document.body.innerHTML = ''

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

  test.each([
    { value: 40, min: 0, max: 100, expected: 40 },
    { value: 40, min: 100, max: 200, expected: 100 },
    { value: 40, min: 10, max: 20, expected: 20 },
  ])('clamp', ({ value, min, max, expected }) => {
    expect(clamp(value, min, max)).toBe(expected)
  })

  test.each([
    { value: 40, min: 0, max: 100, expected: 40 },
    { value: 40, min: 100, max: 200, expected: 0 },
    { value: 40, min: 10, max: 20, expected: 100 },
    { value: 15, min: 10, max: 20, expected: 50 },
    { value: 15, min: 10, max: 10, expected: 0 },
  ])('normalize', ({ value, min, max, expected }) => {
    expect(normalize(value, min, max)).toBe(expected)
  })

  test.each([
    { value: [20, 40], reverse: false, expected: [20, 40] },
    { value: [40, 30], reverse: true, expected: [30, 40] },
  ])('getValue', ({ value, reverse, expected }) => {
    expect(getValue(value, reverse)).toEqual(expected)
  })

  test('updates nearest handle value on track click', () => {
    const { root, track } = createTrack(10, 100)

    let value: ManipulatorValue = [20, 80]
    const onChange = vi.fn((nextValue: number | number[]) => {
      value = [...nextValue as number[]] as ManipulatorValue
    })

    const manipulator = createManipulator({
      value: () => value,
      min: () => 0,
      max: () => 100,
      getTrack: () => track,
      getActiveHandle: () => null,
      setActiveHandle: () => {},
      handles: () => value.map((position, index) => ({ index, value: position, position })),
      onChange,
      onReverse: () => {},
    })

    manipulator.connect(root)
    manipulator.onClick(new MouseEvent('click', { clientX: 75 }))

    expect(onChange).toHaveBeenCalledWith([20, 65])
    manipulator.disconnect()
  })

  test('keeps ascending value order when first range handle crosses the second one during drag', () => {
    const { root, track } = createTrack(0, 100)

    let value: ManipulatorValue = [20, 80]
    let activeHandle: number | null = null

    const onChange = vi.fn((nextValue: number | number[]) => {
      value = [...nextValue as number[]] as ManipulatorValue
    })

    const onReverse = vi.fn()
    const setActiveHandle = vi.fn((index: number | null) => {
      activeHandle = index
    })

    const manipulator = createManipulator({
      value: () => value,
      min: () => 0,
      max: () => 100,
      getTrack: () => track,
      getActiveHandle: () => activeHandle,
      setActiveHandle,
      handles: () => value.map((position, index) => ({ index, value: position, position })),
      onChange,
      onReverse,
    })

    manipulator.connect(root)

    manipulator.onDragStart(0, new MouseEvent('mousedown', { clientX: 20 }))
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 95 }))
    window.dispatchEvent(new MouseEvent('mouseup'))

    expect(setActiveHandle).toHaveBeenNthCalledWith(1, 0)
    expect(setActiveHandle).toHaveBeenLastCalledWith(null)
    expect(onReverse).toHaveBeenCalledWith(true)
    expect(onReverse).toHaveBeenLastCalledWith(false)
    expect(onChange).toHaveBeenCalledWith([80, 95])

    manipulator.disconnect()
  })

  test('stops reacting to mousemove events after disconnect', () => {
    const { root, track } = createTrack(0, 100)

    let value: ManipulatorValue = [10]
    let activeHandle: number | null = null
    const onChange = vi.fn((nextValue: number | number[]) => {
      value = [...nextValue as number[]] as ManipulatorValue
    })

    const manipulator = createManipulator({
      value: () => value,
      min: () => 0,
      max: () => 100,
      getTrack: () => track,
      getActiveHandle: () => activeHandle,
      setActiveHandle: (index: number | null) => {
        activeHandle = index
      },
      handles: () => [{ index: 0, value: value[0], position: value[0] }],
      onChange,
      onReverse: () => {},
    })

    manipulator.connect(root)

    manipulator.onDragStart(0, new MouseEvent('mousedown', { clientX: 10 }))
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 40 }))

    const callsBeforeDisconnect = onChange.mock.calls.length
    manipulator.disconnect()
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 90 }))

    expect(onChange.mock.calls.length).toBe(callsBeforeDisconnect)
  })
})
