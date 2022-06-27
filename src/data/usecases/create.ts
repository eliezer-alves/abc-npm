import { UnauthorizedError, UnexpectedError } from '../../domain/errors'
import { Create as ICreate, CreateParams, CreateResult } from '../../domain/usecases'
import { DBService, DBServiceCode } from '../protocols'

export class Create implements ICreate {
  id?: string

  constructor(private readonly ref: string, private readonly dbService: DBService<CreateResult>) {}

  async exec(params: CreateParams): Promise<CreateResult> {
    const result = await this.dbService.create({
      ref: this.ref,
      body: params,
    })

    switch (result.status) {
      case DBServiceCode.created:
        if (!result.body) {
          throw new UnexpectedError()
        }
        return result.body
      case DBServiceCode.unauthorized:
        throw new UnauthorizedError()
      default:
        throw new UnexpectedError()
    }
  }
}
