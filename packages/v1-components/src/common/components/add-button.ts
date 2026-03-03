export enum COLOR {
  GREEN = 'green',
  BLUE = 'blue',
  RED = 'red',
  YELLOW = 'yellow',
  PURPLE = 'purple',
}

export type UiAddButtonProperties = {
  type?: HTMLButtonElement['type'];
  small?: boolean;
  color?: COLOR | `${COLOR}`;
  disabled?: boolean;
  height?: number | string;
}

export const isNumeric = (value: number | string): boolean => !isNaN(Number(value))

export const normalizeHeight = (height: number | string): string => {
  return isNumeric(height)
    ? `${height}px`
    : `${height}`
}
