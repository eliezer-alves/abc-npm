import { FindParam, FindResult } from '../../../domain/usecases'
import { faker } from '@faker-js/faker'

export const mockFindParam = (): FindParam => {
  return faker.random.alphaNumeric(10)
}

export const mockFindResult = (id = mockFindParam()): FindResult => ({
  id: id,
  email: faker.internet.email(),
  password: faker.internet.password(),
})
