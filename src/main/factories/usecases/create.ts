import { DBService } from '@/data/protocols'
import { Create } from '@/data/usecases'

export const makeCreate = (table: string, dbService: DBService): Create => {
  return new Create(table, dbService)
}
