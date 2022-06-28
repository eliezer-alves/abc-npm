import { DeleteParam, DeleteResult } from '../../../domain/usecases'
import { faker } from '@faker-js/faker'

export const mockDeleteParam = (): DeleteParam => {
  return faker.random.alphaNumeric(10)
}

export const mockDeleteResult = (id = mockDeleteParam()): DeleteResult => ({
  id: id,
  email: faker.internet.email(),
  password: faker.internet.password(),
})
