import { CreateParams } from '@/domain/usecases'
import { faker } from '@faker-js/faker'

export const mockNewEntityParams = (): CreateParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
})
