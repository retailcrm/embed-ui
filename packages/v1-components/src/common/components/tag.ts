export enum SIZE {
  LG = 'lg',
  MD = 'md',
  SM = 'sm',
  XS = 'xs',
}

export type UiTagProperties = {
  size?: SIZE | `${SIZE}`;
  pinned?: boolean;
  removable?: boolean;
  interactive?: boolean;
  saturated?: boolean;
  background?: string;
  ticker?: boolean;
}

type StyleDeclaration = CSSStyleDeclaration & {
  '--delta-width': string
}

export function deltaTransition(el: HTMLElement): Partial<StyleDeclaration> {
  const delta = el.scrollWidth - el.clientWidth
  const animationDuration = `${((el.scrollWidth / el.clientWidth) * 2).toFixed(2)}s`

  return delta !== 0 ? {
    '--delta-width': `-${delta}px`,
    animationDuration,
  } : {}
}
