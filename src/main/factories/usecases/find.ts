import { DBService } from '../../../data/protocols'
import { Find } from '../../../data/usecases'

export const makeFind = (table: string, dbService: DBService): Find => {
  return new Find(table, dbService)
}
