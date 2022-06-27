import { FindResult } from '../../../domain/usecases'
import { faker } from '@faker-js/faker'

export const mockFindResult = (id = faker.random.alphaNumeric(8)): FindResult => ({
  id: id,
  email: faker.internet.email(),
  password: faker.internet.password(),
})
