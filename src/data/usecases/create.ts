import { DBService } from '../protocols'

export class Create {
  constructor(
    private readonly ref: string,
    private readonly dbService: DBService,
  ) {}

  exec(params: any): Promise<void> {
    this.dbService.create(params, this.ref)
    return Promise.resolve()
  }
}
