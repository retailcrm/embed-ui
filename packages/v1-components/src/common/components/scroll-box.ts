export type UiScrollBoxProperties = {
  tag?: string,
  native?: boolean,
  showOnHover?: boolean,
  showOnMac?: boolean,
}

export type UiScrollBoxMethods = {
  scroll (y: number): void;
  update (): void;
}
