import { Create } from '@/data/usecases/create'
import { DBServiceSpy } from '../../mocks'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: Create
  dbService: DBServiceSpy
}
const makeSut = (ref: string = faker.internet.url()): SutTypes => {
  const dbService = new DBServiceSpy()
  const sut = new Create(ref, dbService)

  return {
    sut,
    dbService,
  }
}

describe('Create', () => {
  it('Should call DBServer with correct reference', async () => {
    const ref = faker.internet.url()
    const { sut, dbService } = makeSut(ref)
    const params = {}
    await sut.exec(params)
    expect(dbService.ref).toBe(ref)
  })
})
