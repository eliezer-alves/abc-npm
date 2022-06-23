import { CreateParams } from '@/domain/usecases/create'
import { DBService } from '../protocols'

export class Create {
  constructor(
    private readonly ref: string,
    private readonly dbService: DBService,
  ) {}

  exec(params: CreateParams): Promise<void> {
    this.dbService.create({
      ref: this.ref,
      body: params,
    })
    return Promise.resolve()
  }
}
