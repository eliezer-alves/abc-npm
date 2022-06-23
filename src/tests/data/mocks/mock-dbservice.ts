import { DBService, DBServiceParams } from '@/data/protocols'

export class DBServiceSpy implements DBService {
  ref?: string
  body?: any

  create(data: DBServiceParams): Promise<void> {
    this.ref = data.ref
    this.body = data.body
    return Promise.resolve()
  }
}
