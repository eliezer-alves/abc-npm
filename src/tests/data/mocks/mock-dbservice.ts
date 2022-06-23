import {
  DBService,
  DBServiceCode,
  DBServiceParams,
  DBServiceResponse,
} from '@/data/protocols'

export class DBServiceSpy implements DBService {
  ref?: string
  body?: object
  response: DBServiceResponse = {
    status: DBServiceCode.ok,
  }

  create(data: DBServiceParams): Promise<DBServiceResponse> {
    this.ref = data.ref
    this.body = data.body
    return Promise.resolve(this.response)
  }
}
