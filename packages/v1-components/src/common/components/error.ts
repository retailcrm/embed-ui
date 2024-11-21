export enum ALIGN {
    LEFT = 'left',
    RIGHT = 'right',
}

export type UiErrorProperties = {
    message: string;
    align?: ALIGN | `${ALIGN}`;
    ellipsis?: boolean;
}
