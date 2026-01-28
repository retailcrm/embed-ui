import type { Alignment } from '@floating-ui/dom'
import type { PlacementOptions } from '@/common/components/popper'
import type { Side } from '@floating-ui/dom'
import type { Trigger } from '@/common/components/popper'
import type { TriggerSchema } from '@/common/components/popper'
import type { UiPopperProperties } from '@/common/components/popper'

export enum SIZE {
    XS = 'xs',
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
    XL = 'xl',
}

export enum PLACEMENT {
    TOP = 'top',
    TOP_START = 'top-start',
    TOP_END = 'top-end',
    BOTTOM = 'bottom',
    BOTTOM_START = 'bottom-start',
    BOTTOM_END = 'bottom-end',
    LEFT = 'left',
    LEFT_START = 'left-start',
}

export type UiSelectTriggerProperties = {
    value?: unknown|unknown[];
    expandable?: boolean;
    clearable?: boolean;
    invalid?: boolean;
    multiple?: boolean;
    opened?: boolean;
    expanded?: boolean;
    placeholder?: string;
    readonly?: boolean;
    disabled?: boolean;
    onlyPlaceholder?: boolean;
    inputSize?: SIZE | `${SIZE}`;
}

export type UiSelectPopperProperties = {
    opened?: boolean;
    targetTriggers?: Trigger[] | TriggerSchema;
    popperTriggers?: Trigger[] | TriggerSchema;
    popperFitTrigger?: boolean;
    placement?: Side | `${Side}-${Alignment}` | PlacementOptions;
    popperClass?: string;
    popperOptions?: Omit<UiPopperProperties, 'placement' | 'shown' | 'target' | 'triggers'>;
    disabled?: boolean;
    readonly?: boolean;
    multiple?: boolean;
}