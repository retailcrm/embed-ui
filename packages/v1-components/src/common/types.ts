export type Numeric = number | string

export type Primitive = boolean | number | string | null | undefined

export type SerializedDOMRect = { [K in Exclude<keyof DOMRect, 'toJSON'>]: DOMRect[K] }
