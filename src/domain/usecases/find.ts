export type FindParam = string

export type FindResult = object

export interface Find {
  exec(id: FindParam): Promise<FindResult>
}
