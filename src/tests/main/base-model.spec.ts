import { faker } from '@faker-js/faker'
// import { BaseModel } from '../../main/models'
import { BaseModel } from '../../../dist'

type SutTypes = {
  sut: BaseModel
}
const makeSut = (): SutTypes => {
  const table = 'users-test'
  const columns = ['name', 'email']
  const sut = new BaseModel(table, columns)

  return { sut }
}

describe('BaseModel', () => {
  it('Should return correct response when execute create method', async () => {
    const { sut } = makeSut()
    const params = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
    }
    const result = await sut.create(params)
    expect(typeof result.id).toBe('string')
  })
})
