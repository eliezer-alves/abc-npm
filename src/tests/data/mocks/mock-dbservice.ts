import {
  DBService,
  DBServiceCode,
  DBServiceParams,
  DBServiceResponse,
} from '../../../data/protocols'

export class DBServiceSpy<T> implements DBService<T> {
  ref?: string
  body?: object
  response: DBServiceResponse<T> = {
    status: DBServiceCode.ok,
  }

  create(data: DBServiceParams): Promise<DBServiceResponse<T>> {
    this.ref = data.ref
    this.body = data.body
    return Promise.resolve(this.response)
  }

  find(data: DBServiceParams): Promise<DBServiceResponse<T>> {
    this.ref = data.ref
    this.body = data.body
    return Promise.resolve(this.response)
  }
}
