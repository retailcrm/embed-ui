export enum TYPE {
  SINGLE = 'single',
  RANGE = 'range',
}

export const MIN = 0
export const MAX = 100

export type UiSliderProperties = {
  type?: TYPE | `${TYPE}`;
  value?: number | number[];
  min?: number;
  max?: number;
  labelled?: boolean;
}

export type Handle = {
  index: number;
  value: number;
  position: number;
}

export type SliderValue = [number] | [number, number]

export type Manipulator = {
  connect (root: HTMLElement): void;
  disconnect (): void;
  onClick (event: MouseEvent): void;
  onDragStart (index: number, event: MouseEvent): void;
  onDragEnd (): void;
}

export const clamp = (
  value: number,
  min: number = MIN,
  max: number = MAX
): number => (value < min) ? min : (value > max) ? max : value

export const normalize = (
  value: number,
  min: number = MIN,
  max: number = MAX
): number => {
  return min !== max
    ? (100 * (clamp(value, min, max) - min)) / (max - min)
    : 0
}

export const getValue = (values: number[], reverse: boolean): number[] => {
  const value = [...values]

  return reverse ? value.reverse() : value
}

export const createManipulator = (options: {
  value: () => SliderValue;
  min: () => number;
  max: () => number;
  getTrack: () => HTMLElement | null;
  getActiveHandle: () => number | null;
  setActiveHandle: (index: number | null) => void;
  handles: () => Handle[];
  onChange: (value: number | number[]) => void;
  onReverse: (reversed: boolean) => void;
}): Manipulator => {
  let trackLeft = 0
  let trackWidth = 0

  const actualizeTrack = () => {
    const rect = options.getTrack()?.getBoundingClientRect() ?? null

    trackLeft = rect?.left ?? 0
    trackWidth = rect?.width ?? 0
  }

  const scheduleTrackActualization = () => {
    if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(actualizeTrack)
      return
    }

    actualizeTrack()
  }

  let startX = null as number | null
  let startPosition = 0
  let newPosition = null as number | null
  let reversed = false

  const setReversed = (value: boolean) => {
    options.onReverse(reversed = value)
  }

  let observer = null as null | ResizeObserver
  const connect = (root: HTMLElement) => {
    if (typeof window !== 'undefined' && typeof window.ResizeObserver === 'function') {
      observer = new window.ResizeObserver(scheduleTrackActualization)
      observer.observe(root)
    }

    actualizeTrack()
  }

  const disconnect = () => {
    onDragEnd()
    observer?.disconnect()
    observer = null
  }

  const onDragStart = (index: number, event: MouseEvent) => {
    actualizeTrack()

    options.setActiveHandle(index)
    startX = event.clientX

    startPosition = options.handles()[index].position
    newPosition = startPosition

    window.addEventListener('mousemove', onDrag)
    window.addEventListener('mouseup', onDragEnd)
  }

  const onDrag = (event: MouseEvent) => {
    const activeHandle = options.getActiveHandle()
    if (activeHandle === null || startX === null) {
      return
    }

    const max = options.max()
    const min = options.min()

    const offset = trackWidth > 0 ? (event.clientX - startX) / trackWidth * 100 : 0
    newPosition = (startPosition + offset) * (max - min) * 0.01 + min

    const newValue = getValue(options.value(), reversed)
    newValue[activeHandle] = clamp(Math.ceil(newPosition), min, max)

    setReversed(newValue[0] > newValue[1])
    options.onChange(getValue(newValue, reversed))
  }

  const onClick = (event: MouseEvent) => {
    actualizeTrack()

    const value = options.value()
    const max = options.max()
    const min = options.min()

    const newValue = [...value]
    const positionOnTrack = clamp(event.clientX - trackLeft, 0, trackWidth)

    const currentValue = trackWidth > 0 ? Math.ceil((positionOnTrack / trackWidth) * (max - min) + min) : min

    const [minValue, maxValue = Infinity] = value
    const index = Math.abs(minValue - currentValue) > Math.abs(maxValue - currentValue) ? 1 : 0

    newValue[index] = currentValue
    options.onChange(newValue)
  }

  const onDragEnd = () => {
    options.setActiveHandle(null)
    setReversed(false)

    window.removeEventListener('mousemove', onDrag)
    window.removeEventListener('mouseup', onDragEnd)
  }

  return {
    connect,
    disconnect,
    onDragStart,
    onClick,
    onDragEnd,
  }
}
