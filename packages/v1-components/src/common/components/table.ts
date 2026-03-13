import type { Numeric } from '@/common/types'
import type { SerializedEvent } from '@omnicajs/vue-remote/types/events'

export enum ALIGN {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

export enum VALIGN {
  TOP = 'top',
  MIDDLE = 'middle',
  BOTTOM = 'bottom',
}

export enum DIRECTION {
  ASC = 'asc',
  DESC = 'desc',
}

export type CssClass =
  | string
  | Record<string, boolean>
  | Array<string | Record<string, boolean>>;

export type RowKey = string | number

export type RowKeyGetter<T> = (row: T, index: number) => RowKey

export type RowAttrs = Record<string, string | number | boolean | undefined> & {
  class?: CssClass;
}

export type RowAttrsGetter<T> = (
  row: T,
  index: number
) => RowAttrs

export type RowClassGetter<T> = (
  row: T,
  index: number
) => CssClass

export type Group<T, GroupData> = {
  key: RowKey;
  data: GroupData;
  rows: readonly T[];
}

export type GroupBy<T, GroupData> = (
  rows: readonly T[]
) => Group<T, GroupData>[]

export type Column<T> = {
  id: string;
  label: string;
  width?: Numeric;
  minWidth?: Numeric;
  maxWidth?: Numeric;
  align: ALIGN | `${ALIGN}`;
  valign: VALIGN | `${VALIGN}`;
  trim: boolean;
  getColspan: (row: T, index: number) => number | undefined;
  getRowspan: (row: T, index: number) => number | undefined;
}

export type DataForCell<T> = {
  row: T;
  index: number;
  key: RowKey;
  expanded: boolean;
  toggle: () => void;
  column: Column<T>;
}

export type DataForLabel<T> = {
  column: Column<T>;
}

export type RowRendererArgs<T> = {
  row: T;
  index: number;
  key: RowKey;
}

export type DataForGroupHead<T, GroupData> = {
  group: Group<T, GroupData>;
  index: number;
}

export type DataForFooter<T, GroupData> = {
  columnsCount: number;
  rowsCount: number;
  groupsCount: number;
  groups: readonly Group<T, GroupData>[];
}

export type RowClickPayload<T> = {
  row: T;
  index: number;
  key: RowKey;
  expanded: boolean;
  toggle: () => void;
}

export type UiTableProperties<T, GroupData = undefined> = {
  rows: readonly T[];
  rowKey?: keyof T | RowKeyGetter<T>;
  headless?: boolean;
  bordered?: boolean;
  fixed?: boolean;
  rowClass?: CssClass | RowClassGetter<T>;
  rowAttrs?: RowAttrsGetter<T>;
  groupBy?: GroupBy<T, GroupData>;
  groupHeadClass?: CssClass;
  groupBodyClass?: CssClass;
}

export type UiTableSlots<T, GroupData = undefined> = {
  default?: () => unknown;
  expand?: (props: RowRendererArgs<T>) => unknown;
  footer?: (props: DataForFooter<T, GroupData>) => unknown;
  'footer-summary'?: (props: DataForFooter<T, GroupData>) => unknown;
  'footer-page-size'?: (props: DataForFooter<T, GroupData>) => unknown;
  'footer-export'?: (props: DataForFooter<T, GroupData>) => unknown;
  'footer-pagination'?: (props: DataForFooter<T, GroupData>) => unknown;
  'group-head'?: (props: DataForGroupHead<T, GroupData>) => unknown;
  empty?: () => unknown;
}

export type UiTableEmits<T> = {
  'row:click': [payload: RowClickPayload<T>, event: SerializedEvent];
}

export type UiTableMethods<RowKeyValue extends RowKey = RowKey> = {
  resetExpanded (): void;
  expand (key: RowKeyValue): void;
  collapse (key: RowKeyValue): void;
  toggle (key: RowKeyValue): void;
}

export type UiTableColumnProperties<T> = {
  label?: string;
  width?: Numeric;
  minWidth?: Numeric;
  maxWidth?: Numeric;
  align?: ALIGN | `${ALIGN}`;
  valign?: VALIGN | `${VALIGN}`;
  trim?: boolean;
  colspan?: (row: T, index: number) => number | undefined;
  rowspan?: (row: T, index: number) => number | undefined;
}

export type UiTableColumnSlots<T> = {
  default?: (props: DataForCell<T>) => unknown;
  cell?: (props: DataForCell<T>) => unknown;
  label?: (props: DataForLabel<T>) => unknown;
}

export type UiTableRootProperties = {
  bordered?: boolean;
  fixed?: boolean;
}

export type UiTableSectionKind = 'head' | 'body' | 'foot'

export type UiTableSectionProperties = {
  kind?: UiTableSectionKind;
}

export type UiTableRowProperties = {
  interactive?: boolean;
  expanded?: boolean;
}

export type UiTableColProperties = {
  width?: Numeric;
  minWidth?: Numeric;
  maxWidth?: Numeric;
}

export type UiTableHeadCellProperties = {
  align?: ALIGN | `${ALIGN}`;
  trim?: boolean;
}

export type UiTableSorterProperties = {
  direction?: DIRECTION | `${DIRECTION}` | null;
}

export type UiTableFooterSectionProperties = Record<string, never>

export type UiTableFooterButtonType = 'button' | 'submit' | 'reset'

export type UiTableFooterButtonProperties = {
  type?: UiTableFooterButtonType;
}

export type UiTableBodyCellTheme = 'default' | 'group'

export type UiTableBodyCellProperties = {
  align?: ALIGN | `${ALIGN}`;
  valign?: VALIGN | `${VALIGN}`;
  colspan?: number;
  rowspan?: number;
  trim?: boolean;
  theme?: UiTableBodyCellTheme;
}

export const byRowKey = <T, K extends keyof T>(key: K): RowKeyGetter<T> => {
  return (row: T): RowKey => row[key] as RowKey
}

export const asRowClass = <T>(value: RowClassGetter<T>): RowClassGetter<T> => value

export const asRowAttrs = <T>(value: RowAttrsGetter<T>): RowAttrsGetter<T> => value
