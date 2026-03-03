export enum COLLAPSE_BEHAVIOUR {
  DISPOSE = 'dispose',
  HIDE = 'hide',
}

export type UiCollapseProperties = {
  expanded?: boolean;
  collapseBehaviour?: COLLAPSE_BEHAVIOUR | `${COLLAPSE_BEHAVIOUR}`;
  duration?: number | string;
}
