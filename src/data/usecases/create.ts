import { UnauthorizedError } from '@/domain/errors'
import { CreateParams } from '@/domain/usecases'
import { DBService, DBServiceCode } from '../protocols'

export class Create {
  constructor(
    private readonly ref: string,
    private readonly dbService: DBService,
  ) {}

  async exec(params: CreateParams): Promise<void> {
    const result = await this.dbService.create({
      ref: this.ref,
      body: params,
    })

    switch (result.status) {
      case DBServiceCode.unauthorized:
        throw new UnauthorizedError()
      default:
        return Promise.resolve()
    }
  }
}
