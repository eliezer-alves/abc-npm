import { DBService } from '../../../data/protocols'
import { Delete } from '../../../data/usecases'

export const makeDelete = (table: string, dbService: DBService): Delete => {
  return new Delete(table, dbService)
}
