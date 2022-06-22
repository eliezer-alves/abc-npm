import { Create } from '@/data/usecases/create'
import { DBService } from '@/data/protocols/dbservice'
import { faker } from '@faker-js/faker'

class DBServiceSpy implements DBService {
  ref?: string
  create(params: any, ref: string): Promise<void> {
    this.ref = ref
    return Promise.resolve()
  }
}

describe('Create', () => {
  it('Gearante que DBService é chamado com referencia correta', async () => {
    const ref = faker.internet.url()
    const dbService = new DBServiceSpy()
    const sut = new Create(ref, dbService)
    const params = {}
    await sut.exec(params)
    expect(dbService.ref).toBe(ref)
  })
})
