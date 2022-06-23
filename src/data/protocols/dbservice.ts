export type DBServiceParams = {
  ref: string
  body: object
}

export enum DBServiceCode {
  ok = 200,
  created = 201,
  badRequest = 400,
  unauthorized = 401,
  serverError = 500,
}

export type DBServiceResponse = {
  status: DBServiceCode
}

export interface DBService {
  create(params: DBServiceParams): Promise<DBServiceResponse>
}
