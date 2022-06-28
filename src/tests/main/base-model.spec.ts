import { faker } from '@faker-js/faker'
import { BaseModel } from '../../main/models'

type SutTypes = {
  sut: BaseModel
}
const makeSut = (): SutTypes => {
  const table = 'users-test'
  const columns = ['name', 'email']
  const sut = new BaseModel(table, columns)

  return { sut }
}

class Entity {
  public data = {}
  public id = ''
}

describe('BaseModel', () => {
  const entity = new Entity()

  it('Should return correct response when execute create method', async () => {
    const { sut } = makeSut()
    const params = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
    }
    const result = await sut.create(params)
    entity.data = params
    entity.id = result.id

    expect(typeof result.id).toBe('string')
  })

  it('Should return correct response when execute find method before create', async () => {
    const { sut } = makeSut()
    const result = await sut.find(entity.id)

    expect(result).toEqual({
      id: entity.id,
      ...entity.data,
    })
  })
})
