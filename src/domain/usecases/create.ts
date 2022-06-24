export type CreateParams = object

export type CreateResult = {
  id: string
}

export interface Create {
  exec(params: CreateParams): Promise<CreateResult>
}
