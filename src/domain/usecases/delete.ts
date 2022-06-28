export type DeleteParam = string

export type DeleteResult = any

export interface Delete {
  exec(id: DeleteParam): Promise<DeleteResult>
}
