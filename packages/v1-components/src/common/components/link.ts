export enum APPEARANCE {
  BREADCRUMBS = 'breadcrumbs',
  DEFAULT = 'default',
  NAVIGATION = 'navigation',
  NAVIGATION_ANCHOR = 'navigation-anchor',
  TITLE = 'title',
}

export enum SIZE {
  ARTICLE = 'article',
  BODY = 'body',
  PARAGRAPH = 'paragraph',
  SMALL = 'small',
  TINY = 'tiny',
  TITLE01 = 'title-01',
  TITLE02 = 'title-02',
}

export type UiLinkProperties = {
  href?: string;
  external?: boolean;
  appearance?: APPEARANCE | `${APPEARANCE}`;
  size?: SIZE | `${SIZE}`;
  light?: boolean;
  accent?: boolean;
  dotted?: boolean;
  ellipsis?: boolean;
}