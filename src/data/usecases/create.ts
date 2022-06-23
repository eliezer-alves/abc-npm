import { UnauthorizedError, UnexpectedError } from '@/domain/errors'
import { CreateParams, CreateResult } from '@/domain/usecases'
import { DBService, DBServiceCode } from '../protocols'

export class Create {
  id?: string

  constructor(
    private readonly ref: string,
    private readonly dbService: DBService<CreateResult>,
  ) {}

  async exec(params: CreateParams): Promise<void> {
    const result = await this.dbService.create({
      ref: this.ref,
      body: params,
    })

    switch (result.status) {
      case DBServiceCode.created:
        this.id = result.body?.id
        return Promise.resolve()
      case DBServiceCode.unauthorized:
        throw new UnauthorizedError()
      default:
        throw new UnexpectedError()
    }
  }
}
