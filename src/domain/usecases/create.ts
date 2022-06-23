export type CreateParams = object
export type CreateResult = {
  id: string
}

export interface Create {
  exec(params: CreateParams, callback: () => void): Promise<void>
}
