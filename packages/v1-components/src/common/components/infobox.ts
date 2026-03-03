export type UiInfoboxProperties = {
  id?: string;
  title?: string;
  shown?: boolean;
  expanded?: boolean;
  expandable?: boolean;
  closable?: boolean;
  warning?: boolean;
}

export type UiInfoboxMethods = {
  show (): void;
  hide (): void;
  toggle (): void;
}
