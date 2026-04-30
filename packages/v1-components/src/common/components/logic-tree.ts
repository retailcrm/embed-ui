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

export enum LogicTreeNodeView {
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

export type UiLogicTreeConnector = {
  continues: boolean;
  placeholder?: boolean;
  tone: LogicTreeTone;
  visible: boolean;
}

export type UiLogicTreeNodeData<TNodeData extends object = Record<string, never>> = {
  view: LogicTreeNodeView;
  editable: boolean;
  disabled?: boolean;
  draggable?: boolean;
  selected?: boolean;
  highlighted?: boolean;
} & TNodeData

export type UiLogicTreeNode<TNodeData extends object = Record<string, never>> = {
  id: string;
  kind: LogicTreeNodeKind;
  tone?: LogicTreeTone;
  conjunction?: LogicTreeConjunction | string;
  collapsible?: boolean;
  expanded?: boolean;
  childrenView?: LogicTreeChildrenView;
  children?: UiLogicTreeNode<TNodeData>[];
  data: UiLogicTreeNodeData<TNodeData>;
}

export type UiLogicTreeProperties<TNodeData extends object = Record<string, never>> = {
  items?: UiLogicTreeNode<TNodeData>[];
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

export type UiLogicTreeNodeAddPayload = {
  actionId: string;
  kind: Exclude<UiLogicTreeNode['kind'], LogicTreeNodeKind.BRANCH>;
  parentNodeId: string | null;
  parentPathKey: string | null;
  triggerNodeId: string;
}

export type UiLogicTreeNodeEditPayload = {
  controlId: string;
  nodeId: string;
  pathKey: string;
  value: string | number | null;
}

export type UiLogicTreeNodeRemovePayload = {
  index: number;
  nodeId: string;
  parentNodeId: string | null;
  parentPathKey: string | null;
  pathKey: string;
}

export type UiLogicTreeNodeSlotProps<TNodeData extends object = Record<string, never>> = {
  editing: boolean;
  expanded: boolean;
  grouped: boolean;
  groupedHeader: boolean;
  groupedPosition?: UiLogicTreeNodeProperties['groupedPosition'];
  hasChildren: boolean;
  highlighted: boolean;
  disabled: boolean;
  node: UiLogicTreeNode<TNodeData>;
  path: number[];
  pathKey: string;
  nodeView: LogicTreeNodeView;
  selected: boolean;
  onAction: (actionId: string, kind: Exclude<UiLogicTreeNode<TNodeData>['kind'], LogicTreeNodeKind.BRANCH>) => void;
  onControlAction: (controlId: string) => void;
  onControlUpdate: (controlId: string, value: string | number | null) => void;
  onRemove: () => void;
  onToggle: () => void;
}

export type UiLogicTreeRootProperties = Record<string, never>

export type UiLogicTreeCaretProperties = {
  active?: boolean;
}

export type UiLogicTreeNodeProperties = {
  pathKey?: string;
  nodeView?: LogicTreeNodeView;
  connectors?: UiLogicTreeConnector[];
  conjunction?: string;
  conjunctionEndPathKey?: string;
  conjunctionLabel?: string;
  conjunctionOffset?: number;
  conjunctionStartPathKey?: string;
  conjunctionTone?: LogicTreeTone;
  groupedHeader?: boolean;
  grouped?: boolean;
  groupedPosition?: 'end' | 'middle' | 'single' | 'start';
  editable?: boolean;
  disabled?: boolean;
  highlighted?: boolean;
  selected?: boolean;
}
