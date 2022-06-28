import { DeleteParam, DeleteResult } from '../../../domain/usecases'
import { faker } from '@faker-js/faker'

export const mockDeleteParam = (): DeleteParam => {
  return faker.random.alphaNumeric(10)
}
