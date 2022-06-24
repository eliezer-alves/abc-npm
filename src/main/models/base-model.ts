import { DBService } from '@/data/protocols'
import { Create as _Create } from '@/domain/usecases'
import { makeDBService } from '../factories/infra'
import { makeCreate } from '../factories/usecases/create'

export class BaseModel {
  private dbService: DBService
  private _create: _Create

  constructor(readonly table: string, readonly columns: Array<string>) {
    this.dbService = makeDBService()
    this._create = makeCreate(table, this.dbService)
  }

  async create(params: object) {
    const response = await this._create.exec(params)
    return response
  }
}
