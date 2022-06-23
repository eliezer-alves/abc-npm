import { DBService } from '@/data/protocols'

export class DBServiceSpy implements DBService {
  ref?: string
  create(params: any, ref: string): Promise<void> {
    this.ref = ref
    return Promise.resolve()
  }
}
