export enum SIZE {
    XS = 'xs',
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
}

export type UiMenuItemProperties = {
    description?: string;
    counter?: string | number | null;
    accent?: boolean;
    active?: boolean;
    danger?: boolean;
    ticker?: boolean;
    simple?: boolean;
    size?: `${SIZE}`;
    disabled?: boolean;
}

type StyleDeclaration = CSSStyleDeclaration & {
    '--delta-width': string
}

export const deltaTransition = (el: HTMLElement): Partial<StyleDeclaration> => {
  const delta = el.scrollWidth - el.clientWidth
  return delta !== 0 ? {
    '--delta-width': `-${delta}px`,
    animationDuration: `${delta * 15}ms`,
  } : {}
}
