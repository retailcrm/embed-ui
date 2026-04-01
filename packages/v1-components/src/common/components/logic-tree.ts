export enum LogicTreeActionKind {
  CONDITION = 'condition',
  GROUP = 'group',
}

export enum LogicTreeControlKind {
  ICON = 'icon',
  INPUT = 'input',
  SELECT = 'select',
}

export enum LogicTreeIcon {
  ADD = 'add',
  MORE = 'more',
}

export enum LogicTreeNodeKind {
  CONDITION = 'condition',
  GROUP = 'group',
}

export enum LogicTreeConjunction {
  AND = 'and',
  OR = 'or',
}

export enum LogicTreeRowKind {
  ACTIONS = 'actions',
  EDITOR = 'editor',
  SUMMARY = 'summary',
}

export enum LogicTreeTone {
  BLUE = 'blue',
  GREEN = 'green',
  GREY = 'grey',
  RED = 'red',
  YELLOW = 'yellow',
}

export type UiLogicTreeControl = {
  clearable?: boolean;
  disabled?: boolean;
  id: string;
  icon?: LogicTreeIcon;
  invalid?: boolean;
  kind: LogicTreeControlKind;
  label: string;
  options?: UiLogicTreeOption[];
  placeholder?: string;
  readonly?: boolean;
  value?: string | number | null;
  width?: number | string;
}

export type UiLogicTreeAction = {
  id: string;
  kind?: LogicTreeActionKind;
  label: string;
}

export type UiLogicTreeConnector = {
  continues: boolean;
  tone: LogicTreeTone;
  visible: boolean;
}

export type UiLogicTreeOption = {
  id: string;
  label: string;
  value: string | number;
}

export type UiLogicTreeInlineText = {
  id: string;
  separated?: boolean;
  text: string;
  tone?: LogicTreeTone | 'default' | 'muted';
  weight?: 'regular' | 'semibold';
}

export type UiLogicTreeNode = {
  actions?: UiLogicTreeAction[];
  children?: UiLogicTreeNode[];
  childrenGrouped?: boolean;
  conjunction?: LogicTreeConjunction | string;
  collapsible?: boolean;
  controls?: UiLogicTreeControl[];
  draggable?: boolean;
  expanded?: boolean;
  highlighted?: boolean;
  id: string;
  inline?: UiLogicTreeInlineText[];
  kind?: LogicTreeNodeKind;
  meta?: string;
  removable?: boolean;
  rowKind?: LogicTreeRowKind;
  selected?: boolean;
  surface?: boolean;
  subtitle?: string;
  title: string;
  tone?: LogicTreeTone;
}

export type UiLogicTreeProperties = {
  editable?: boolean;
  items?: UiLogicTreeNode[];
  surface?: boolean;
}

export type UiLogicTreeRootProperties = {
  surface?: boolean;
}

export type UiLogicTreeRowProperties = {
  conjunction?: string;
  conjunctionLabel?: string;
  conjunctionTone?: LogicTreeTone;
  connectors?: UiLogicTreeConnector[];
  draggable?: boolean;
  editing?: boolean;
  grouped?: boolean;
  groupedPosition?: 'end' | 'middle' | 'single' | 'start';
  highlighted?: boolean;
  nodeKind?: LogicTreeNodeKind;
  pathKey?: string;
  rowKind?: LogicTreeRowKind;
  selected?: boolean;
  surface?: boolean;
}
