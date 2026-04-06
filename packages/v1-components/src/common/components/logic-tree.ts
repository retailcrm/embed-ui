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
  editable: boolean;
  contentSlot?: boolean;
  icon?: LogicTreeIcon;
  inline?: UiLogicTreeInlineText[];
  controls?: UiLogicTreeControl[];
  actions?: UiLogicTreeAction[];
  draggable?: boolean;
  removable?: boolean;
  selected?: boolean;
  highlighted?: boolean;
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
  items?: UiLogicTreeNode[];
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

export type UiLogicTreeRowAddPayload = {
  actionId: string;
  item: UiLogicTreeNode;
  kind: Exclude<UiLogicTreeNode['kind'], LogicTreeNodeKind.BRANCH>;
  nodeId: string;
  parentNodeId: string | null;
  parentPathKey: string | null;
  pathKey: string;
  triggerNodeId: string;
}

export type UiLogicTreeRowEditPayload = {
  controlId: string;
  item: UiLogicTreeNode;
  nodeId: string;
  pathKey: string;
  previousValue: string | number | null;
  value: string | number | null;
}

export type UiLogicTreeRowRemovePayload = {
  index: number;
  item: UiLogicTreeNode;
  nodeId: string;
  parentNodeId: string | null;
  parentPathKey: string | null;
  pathKey: string;
}

export type UiLogicTreeRowSlotProps = {
  editing: boolean;
  expanded: boolean;
  grouped: boolean;
  groupedHeader: boolean;
  groupedPosition?: UiLogicTreeRowProperties['groupedPosition'];
  hasChildren: boolean;
  highlighted: boolean;
  node: UiLogicTreeNode;
  path: number[];
  pathKey: string;
  rowView: LogicTreeRowView;
  selected: boolean;
  onAction: (action: UiLogicTreeAction) => void;
  onControlUpdate: (controlId: string, value: string | number) => void;
  onRemove: () => void;
  onToggle: () => void;
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
  editable?: boolean;
  highlighted?: boolean;
  selected?: boolean;
}
