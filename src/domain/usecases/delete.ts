export type DeleteParam = string

export type DeleteResult = boolean

export interface Delete {
  exec(id: DeleteParam): Promise<DeleteResult>
}
