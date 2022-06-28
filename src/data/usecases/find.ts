import { DBService, DBServiceCode } from '../../data/protocols'
import { UnauthorizedError, UnexpectedError } from '../../domain/errors'
import { Find as IFind, FindResult } from '../../domain/usecases'

export class Find implements IFind {
  constructor(private readonly ref: string, private readonly dbService: DBService<FindResult>) {}

  async exec(id: string): Promise<FindResult> {
    const result = await this.dbService.find({
      ref: this.ref,
      body: { id },
    })

    switch (result.status) {
      case DBServiceCode.ok:
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
