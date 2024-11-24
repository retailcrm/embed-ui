export type Numeric = number | string

export type SerializedDOMRect = { [K in Exclude<keyof DOMRect, 'toJSON'>]: DOMRect[K] }