export type DBServiceParams = {
  ref: string
  body: object
}

export interface DBService {
  create(params: DBServiceParams): Promise<void>
}
