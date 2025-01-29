import type {
  Coords,
  Placement,
  Middleware,
  Side,
  Strategy,
} from '@floating-ui/dom'

import type {
  Adaptation,
  FloatingOptions,
} from '@/common/components/popper'

import {
  arrow as arrowMiddleware,
  computePosition,
  flip,
  hide,
  offset,
  shift,
} from '@floating-ui/dom'

const moveArrow = (
  el: HTMLElement,
  placement: Placement,
  strategy: Strategy,
  coords: Partial<Coords>
) => {
  const [side] = placement.split('-') as [Side]

  Object.assign(el.style, {
    position: strategy,
    left: coords.x !== undefined ? `${coords.x}px` : '',
    top: coords.y !== undefined ? `${coords.y}px` : '',
    right: '',
    bottom: '',
    [{
      left: 'right',
      top: 'bottom',
      right: 'left',
      bottom: 'top',
    }[side]]: '-4px',
  })
}

export const move = async (
  el: HTMLElement,
  arrow: HTMLElement | null,
  target: Element,
  options: Required<FloatingOptions> & { onReferenceHidden?: () => void }
) => {
  const adaptation: Adaptation[] = typeof options.placement === 'object'
    ? options.placement.adaptation ?? ['flip', 'shift']
    : ['flip', 'shift']

  const middleware: Middleware[] = []

  if (options.offsetMainAxis || options.offsetCrossAxis) {
    middleware.push(offset({
      mainAxis: Number(options.offsetMainAxis),
      crossAxis: Number(options.offsetCrossAxis),
    }))
  }

  if (adaptation.includes('flip')) {
    middleware.push(flip({ boundary: 'clippingAncestors' }))
  }

  if (adaptation.includes('shift')) {
    middleware.push(shift({ boundary: 'clippingAncestors', padding: 12 }))
  }

  if ('onReferenceHidden' in options) {
    middleware.push(hide({ strategy: 'referenceHidden' }))
  }

  if (arrow) {
    middleware.push(arrowMiddleware({
      element: arrow,
      padding: arrow.offsetWidth / 3,
    }))
  }

  const { placement, strategy, x, y, middlewareData } = await computePosition(target, el, {
    middleware,
    placement: typeof options.placement === 'string'
      ? options.placement
      : options.placement.alignment && options.placement.alignment !== 'center'
        ? `${options.placement.side}-${options.placement.alignment}`
        : options.placement.side,
    strategy: options.strategy,
  })

  el.style.position = strategy
  el.style.transform = `translate3d(${Math.round(x)}px,${Math.round(y)}px,0)`

  if (arrow && middlewareData.arrow) {
    moveArrow(
      arrow,
      placement,
      strategy,
      middlewareData.arrow
    )
  }

  if (middlewareData.hide) {
    const { referenceHidden } = middlewareData.hide
    if (referenceHidden) {
      options.onReferenceHidden?.()
    }
  }
}
