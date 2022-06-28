import { DBService } from '../../data/protocols'
import { Create, Find } from '../../domain/usecases'
import { makeDBService } from '../factories/infra'
import { makeCreate, makeFind } from '../factories/usecases'

export class BaseModel {
  private dbService: DBService
  private _create: Create
  private _find: Find

  constructor(readonly table: string, readonly columns: Array<string>) {
    this.dbService = makeDBService()
    this._create = makeCreate(table, this.dbService)
    this._find = makeFind(table, this.dbService)
  }

  async create(params: object) {
    const response = await this._create.exec(params)
    return response
  }

  async find(id: string) {
    const response = await this._find.exec(id)
    return response
  }
}
