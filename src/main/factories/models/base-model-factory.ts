import { DBService } from '@/data/protocols'
import { Create } from '@/data/usecases'
import { Create as _Create } from '@/domain/usecases'
import { AdapterFirestore } from '@/infra/AdapterFirestore'

export class BaseModel {
  private dbService: DBService
  private _create: _Create

  constructor(readonly table: string, readonly columns: Array<string>) {
    this.dbService = new AdapterFirestore()
    this._create = new Create(table, this.dbService)
  }

  async create(params: object) {
    return this._create.exec(params)
  }
}
