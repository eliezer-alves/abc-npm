import { DBService } from 'data/protocols'
import { FindResult } from '../../domain/usecases'

export class Find {
  constructor(private readonly ref: string, private readonly dbService: DBService<FindResult>) {}

  async exec(id: string): Promise<FindResult> {
    const result = await this.dbService.find({
      ref: this.ref,
      body: { id },
    })

    return result
  }
}
