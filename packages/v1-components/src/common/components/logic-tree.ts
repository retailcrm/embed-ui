export const UI_LOGIC_TREE_ACTION_KIND = {
  CONDITION: 'condition',
  GROUP: 'group',
} as const

export const UI_LOGIC_TREE_CONTROL_KIND = {
  ICON: 'icon',
  INPUT: 'input',
  SELECT: 'select',
} as const

export const UI_LOGIC_TREE_ICON = {
  ADD: 'add',
  MORE: 'more',
} as const

export const UI_LOGIC_TREE_NODE_KIND = {
  CONDITION: 'condition',
  GROUP: 'group',
} as const

export const UI_LOGIC_TREE_RELATION = {
  AND: 'И',
  OR: 'ИЛИ',
} as const

export const UI_LOGIC_TREE_ROW_KIND = {
  ACTIONS: 'actions',
  EDITOR: 'editor',
  SUMMARY: 'summary',
} as const

export const UI_LOGIC_TREE_TONE = {
  BLUE: 'blue',
  GREEN: 'green',
  GREY: 'grey',
  RED: 'red',
  YELLOW: 'yellow',
} as const

export type UiLogicTreeActionKind = typeof UI_LOGIC_TREE_ACTION_KIND[keyof typeof UI_LOGIC_TREE_ACTION_KIND]
export type UiLogicTreeControlKind = typeof UI_LOGIC_TREE_CONTROL_KIND[keyof typeof UI_LOGIC_TREE_CONTROL_KIND]
export type UiLogicTreeIcon = typeof UI_LOGIC_TREE_ICON[keyof typeof UI_LOGIC_TREE_ICON]
export type UiLogicTreeNodeKind = typeof UI_LOGIC_TREE_NODE_KIND[keyof typeof UI_LOGIC_TREE_NODE_KIND]
export type UiLogicTreeRelation = typeof UI_LOGIC_TREE_RELATION[keyof typeof UI_LOGIC_TREE_RELATION]
export type UiLogicTreeRowKind = typeof UI_LOGIC_TREE_ROW_KIND[keyof typeof UI_LOGIC_TREE_ROW_KIND]
export type UiLogicTreeTone = typeof UI_LOGIC_TREE_TONE[keyof typeof UI_LOGIC_TREE_TONE]

export type UiLogicTreeControl = {
  clearable?: boolean;
  disabled?: boolean;
  id: string;
  icon?: UiLogicTreeIcon;
  invalid?: boolean;
  kind: UiLogicTreeControlKind;
  label: string;
  options?: UiLogicTreeOption[];
  placeholder?: string;
  readonly?: boolean;
  value?: string | number | null;
  width?: number | string;
}

export type UiLogicTreeAction = {
  id: string;
  kind?: UiLogicTreeActionKind;
  label: string;
}

export type UiLogicTreeConnector = {
  continues: boolean;
  tone: UiLogicTreeTone;
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
  tone?: UiLogicTreeTone | 'default' | 'muted';
  weight?: 'regular' | 'semibold';
}

export type UiLogicTreeNode = {
  actions?: UiLogicTreeAction[];
  children?: UiLogicTreeNode[];
  collapsible?: boolean;
  controls?: UiLogicTreeControl[];
  draggable?: boolean;
  expanded?: boolean;
  highlighted?: boolean;
  id: string;
  inline?: UiLogicTreeInlineText[];
  kind?: UiLogicTreeNodeKind;
  meta?: string;
  relation?: UiLogicTreeRelation | string;
  removable?: boolean;
  rowKind?: UiLogicTreeRowKind;
  selected?: boolean;
  surface?: boolean;
  subtitle?: string;
  title: string;
  tone?: UiLogicTreeTone;
}

export type UiLogicTreeProperties = {
  /** Включает интерактивное редактирование дерева, drag&drop, удаление и строки действий */
  editable?: boolean;
  items?: UiLogicTreeNode[];
  surface?: boolean;
}

export type UiLogicTreeRootProperties = {
  surface?: boolean;
}

export type UiLogicTreeRowProperties = {
  connectors?: UiLogicTreeConnector[];
  draggable?: boolean;
  highlighted?: boolean;
  pathKey?: string;
  relation?: string;
  relationTone?: UiLogicTreeTone;
  rowKind?: UiLogicTreeRowKind;
  selected?: boolean;
  surface?: boolean;
}
