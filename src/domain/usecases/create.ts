export type CreateParams = object

export interface Create {
  exec(params: CreateParams, callback: () => void): Promise<void>
}
