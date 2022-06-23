import { Create } from '@/data/usecases'
import { DBServiceSpy } from '../../mocks'
import { faker } from '@faker-js/faker'
import { mockNewEntityParams } from '@/tests/domain/mocks'

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
  it('Should call DBServer with correct reference and paramas', async () => {
    const ref = faker.internet.url()
    const { sut, dbService } = makeSut(ref)
    const params = mockNewEntityParams()

    await sut.exec(params)

    expect(dbService.ref).toBe(ref)
    expect(dbService.body).toEqual(params)
  })

  it.todo('Should call the callback function in method exec correctly')
})
