import { AdapterFirestore } from '@/infra/AdapterFirestore'
import { Create } from '@/usecases/create'
import { IEntity } from './interfaces/IEntity'

export class BaseEntity implements IEntity {
  private db: AdapterFirestore
  public data = undefined as any

  constructor(
    readonly table: string,
    readonly columns: Array<string>,
    readonly primaryKey: string = 'id',
  ) {
    this.db = new AdapterFirestore(table, columns, primaryKey)
  }

  async create(attr: object): Promise<string> {
    const create = new Create(this.db)
    await create.exec(attr, this)

    return this.data[this.primaryKey]
  }

  hydrator(attr: any): void {
    this.columns.map(column => {
      return (this.data[column] = attr[column] ?? null)
    })
  }
}
