import type { UiPopperProperties } from '@/common/components/popper'

export enum SIZE {
    XS = 'xs',
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
    XL = 'xl',
}

export enum APPEARANCE {
    INLINE = 'inline',
    OUTLINED = 'outlined',
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
    id?: string
    value?: unknown|unknown[];
    expandable?: boolean;
    clearable?: boolean;
    filterable?: boolean;
    invalid?: boolean;
    multiple?: boolean;
    openWithActiveFocus?: boolean;
    placeholder?: string;
    readonly?: boolean;
    disabled?: boolean;
    onlyPlaceholder?: boolean;
    leadingIcon?: string;
    trailingIcon?: string;
    inputAppearance?: APPEARANCE | `${APPEARANCE}`;
    inputSize?: SIZE | `${SIZE}`;
    inputFitContent?: boolean;
}

export type UiSelectPopperProperties = {
    id?: string;
    shown?: boolean;
    target?: HTMLElement | null;
    placement?: PLACEMENT | `${PLACEMENT}`;
    disabled?: boolean;
    closeOnClick?: boolean;
    popperClass?: string;
    width?: string;
    fitTrigger?: boolean;
    popperOptions?: Omit<UiPopperProperties, 'placement'|'shown'|'target'|'triggers'>;
}

export type UiSelectProperties = {
    value?: unknown|unknown[];
    opened?: boolean;
}