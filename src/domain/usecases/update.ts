export type UpdateParams = object

export type UpdateResult = boolean

export interface Update {
  exec(params: UpdateParams, id: string): Promise<UpdateResult>
}
