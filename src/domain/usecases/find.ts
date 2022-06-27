export type FindResult = object

export interface Find {
  exec(id: string): Promise<FindResult>
}
