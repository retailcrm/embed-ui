import { isIOS } from '@/common/platform'

export type GlobalEventType = 'click' | 'mousedown' | 'touchend'
export type GlobalEventHandler = (event: Event) => void

const onGlobalEvent = (type: GlobalEventType) => (event: Event) => listeners[type].forEach(fn => fn(event))

const listeners: Record<GlobalEventType, GlobalEventHandler[]> = {
  click: [],
  mousedown: [],
  touchend: [],
}

const on = (eventType: GlobalEventType, handler: GlobalEventHandler) => {
  if (!listeners[eventType].includes(handler)) {
    listeners[eventType].push(handler)
  }
}

const off = (eventType: GlobalEventType, handler: GlobalEventHandler) => {
  const index = listeners[eventType].indexOf(handler)
  if (index !== -1) {
    listeners[eventType].splice(index, 1)
  }
}

if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  if (isIOS()) {
    document.addEventListener('touchstart', onGlobalEvent('mousedown'), { passive: true, capture: true })
    document.addEventListener('touchend', onGlobalEvent('touchend'), { passive: true, capture: true })
  } else {
    window.addEventListener('mousedown', onGlobalEvent('mousedown'), true)
    window.addEventListener('click', onGlobalEvent('click'), true)
  }
}

export {
  on,
  off,
}
