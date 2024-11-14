type Scalar = string | number | boolean | null
type Pojo = {
  [key: string]: Scalar | Pojo | Array<Scalar | Pojo>
}

export type Callable = {
  httpCall (
    action: string,
    payload?: string | Pojo
  ): Promise<{ body: string; status: number }>;
}
