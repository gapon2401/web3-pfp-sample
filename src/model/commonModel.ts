export type FC<P = unknown> = ((props: P) => JSX.Element) & {
  propTypes?: Params
}

export type Params = { [key: string]: any }
