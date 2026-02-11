import './modal.less'

export interface Layer {
  id: string;
  isBlocker (): boolean;
  isOverlapped (): boolean;
  setIsOverlapped (isOverlapped: boolean): void;
  emitEscape (): void;
}

export class LayerRegistry {
  private registry: Layer[]
  private started = false

  constructor () {
    this.registry = []
  }

  public start () {
    if (!this.started) {
      this.started = true

      document.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Escape' && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
          const layer = this.registry.find(layer => !layer.isOverlapped())

          if (layer) {
            layer.emitEscape()
          }
        }
      })
    }
  }

  public add (layer: Layer) {
    if (!this.registry.some(l => l.id === layer.id)) {
      this.registry.push(layer)
      this.refresh()
    }
  }

  public remove (layer: Layer) {
    this.registry = this.registry.filter(l => l.id !== layer.id)
    this.refresh()
  }

  public replace (id: string, layer: Layer)  {
    const index = this.registry.findIndex(l => l.id === id)
    if (index === -1) {
      throw new Error('[@embed-ui/modal] replace(): layer was not found')
    }

    this.registry.splice(index, 1, layer)
    this.refresh()
  }

  public refresh () {
    if (!this.registry.length) {
      this.toggleOverflow()
      return
    }

    let overlapped = false

    for (let i = this.registry.length - 1; i >= 0; i--) {
      this.registry[i].setIsOverlapped(overlapped)

      if (!overlapped) {
        overlapped = this.registry[i].isBlocker()
      }
    }

    this.toggleOverflow()
  }

  private toggleOverflow () {
    const style = document.documentElement.style

    if (this.registry.some(l => l.isBlocker())) {
      style.overflow = 'hidden'
    } else if (style.overflow === 'hidden') {
      style.removeProperty('overflow')
    }
  }
}

export const layers = new LayerRegistry()
