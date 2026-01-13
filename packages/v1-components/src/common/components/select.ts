export enum PLACEMENT {
    LEFT = 'left',
    LEFT_START = 'left-start',
    LEFT_END = 'left-end',
    RIGHT = 'right',
    RIGHT_START = 'right-start',
    RIGHT_END = 'right-end',
    TOP = 'top',
    TOP_START = 'top-start',
    TOP_END = 'top-end',
    BOTTOM = 'bottom',
    BOTTOM_START = 'bottom-start',
    BOTTOM_END = 'bottom-end',
}

export enum APPEARANCE {
    INLINE = 'inline',
    OUTLINED = 'outlined',
}

export type UiSelectTriggerProperties = {
    id?: string
    value?: unknown|unknown[];
    expandable?: boolean;
    clearable?: boolean;
    filterable?: boolean;
    invalid?: boolean;
    multiple?: boolean;
    opened?: boolean;
    openWithActiveFocus?: boolean;
    placeholder?: string;
    searchPlaceholder?: string;
    readonly?: boolean;
    disabled?: boolean;
    onlyPlaceholder?: boolean;
    prefixText?: string;
    leadingIcon?: string;
    trailingIcon?: string;
    closeOnClick?: boolean;
    placement?: PLACEMENT | `${PLACEMENT}`;
    inputAppearance?: APPEARANCE | `${APPEARANCE}`;
    inputSize?: INPUT_SIZE | `${INPUT_SIZE}`;
    inputFitContent?: boolean;
    popperClass?: string;
    popperFitTrigger?: boolean;
    tags?: boolean;
    tagsOptions?: Record<string, unknown>;
    noResult?: (string | (() => string));
    ticker?: boolean;
    locale?: string,
}