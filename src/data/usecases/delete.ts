import { DBService, DBServiceCode } from '../../data/protocols'
import { UnauthorizedError, UnexpectedError } from '../../domain/errors'
import { Delete as IDelete, DeleteResult } from '../../domain/usecases'

export class Delete {
  constructor(private readonly ref: string, private readonly dbService: DBService<DeleteResult>) {}

  async exec(id: string): Promise<DeleteResult> {
    const result = await this.dbService.find({
      ref: this.ref,
      body: { id },
    })

    switch (result.status) {
      case DBServiceCode.ok:
        return true
      case DBServiceCode.unauthorized:
        throw new UnauthorizedError()
      default:
        throw new UnexpectedError()
    }
  }
}
