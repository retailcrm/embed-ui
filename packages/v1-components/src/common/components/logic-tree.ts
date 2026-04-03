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
  FOLDER = 'folder',
  MORE = 'more',
}

export enum LogicTreeNodeKind {
  BRANCH = 'branch',
  CONDITION = 'condition',
  GROUP = 'group',
}

export enum LogicTreeChildrenView {
  GROUPED = 'grouped',
  PLAIN = 'plain',
}

export enum LogicTreeConjunction {
  AND = 'and',
  OR = 'or',
}

export enum LogicTreeRowView {
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
  id: string;
  kind: LogicTreeControlKind;
  label: string;
  icon?: LogicTreeIcon;
  options?: UiLogicTreeOption[];
  value?: string | number | null;
  placeholder?: string;
  width?: number | string;
  clearable?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  invalid?: boolean;
}

export type UiLogicTreeAction = {
  id: string;
  kind?: LogicTreeActionKind;
  label: string;
}

export type UiLogicTreeConnector = {
  continues: boolean;
  placeholder?: boolean;
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
  text: string;
  tone?: LogicTreeTone | 'default' | 'muted';
  weight?: 'regular' | 'semibold';
  separated?: boolean;
}

export type UiLogicTreeRow = {
  view: LogicTreeRowView;
  title: string;
  icon?: LogicTreeIcon;
  inline?: UiLogicTreeInlineText[];
  controls?: UiLogicTreeControl[];
  actions?: UiLogicTreeAction[];
  draggable?: boolean;
  removable?: boolean;
  selected?: boolean;
  highlighted?: boolean;
  surface?: boolean;
}

export type UiLogicTreeNode = {
  id: string;
  kind: LogicTreeNodeKind;
  tone?: LogicTreeTone;
  conjunction?: LogicTreeConjunction | string;
  collapsible?: boolean;
  expanded?: boolean;
  childrenView?: LogicTreeChildrenView;
  children?: UiLogicTreeNode[];
  row: UiLogicTreeRow;
}

export type UiLogicTreeProperties = {
  editable?: boolean;
  items?: UiLogicTreeNode[];
  surface?: boolean;
}

export type UiLogicTreeDropPayload = {
  itemId: string;
  sourceContainerId: string;
  targetContainerId: string;
  targetIndex: number | null;
  targetItemId: string | null;
  placement: 'after' | 'before';
  payload?: unknown;
}

export type UiLogicTreeRootProperties = {
  surface?: boolean;
}

export type UiLogicTreeRowProperties = {
  pathKey?: string;
  rowView?: LogicTreeRowView;
  connectors?: UiLogicTreeConnector[];
  conjunction?: string;
  conjunctionLabel?: string;
  conjunctionTone?: LogicTreeTone;
  groupedHeader?: boolean;
  grouped?: boolean;
  groupedPosition?: 'end' | 'middle' | 'single' | 'start';
  editing?: boolean;
  highlighted?: boolean;
  selected?: boolean;
  surface?: boolean;
}
