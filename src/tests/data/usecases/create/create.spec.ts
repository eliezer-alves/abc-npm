import { Create } from '@/data/usecases'
import { DBServiceSpy } from '../../mocks'
import { mockNewEntityParams } from '@/tests/domain/mocks'
import { UnauthorizedError, UnexpectedError } from '@/domain/errors'
import { DBServiceCode } from '@/data/protocols'
import { CreateResult } from '@/domain/usecases'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: Create
  dbService: DBServiceSpy<CreateResult>
}
const makeSut = (ref: string = faker.internet.url()): SutTypes => {
  const dbService = new DBServiceSpy<CreateResult>()
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
    dbService.response = {
      status: DBServiceCode.created,
    }
    const params = mockNewEntityParams()

    await sut.exec(params)

    expect(dbService.ref).toBe(ref)
    expect(dbService.body).toEqual(params)
  })

  it.todo('Should return an id of Entity if DBService returns 201')

  it('Should throw UnauthorizedError if DBService returns 401', async () => {
    const { sut, dbService } = makeSut()
    dbService.response = {
      status: DBServiceCode.unauthorized,
    }
    const promise = sut.exec(mockNewEntityParams())

    await expect(promise).rejects.toThrow(new UnauthorizedError())
  })

  it('Should throw UnexpectedError if DBService returns 400', async () => {
    const { sut, dbService } = makeSut()
    dbService.response = {
      status: DBServiceCode.badRequest,
    }
    const promise = sut.exec(mockNewEntityParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if DBService returns 500', async () => {
    const { sut, dbService } = makeSut()
    dbService.response = {
      status: DBServiceCode.serverError,
    }
    const promise = sut.exec(mockNewEntityParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it.todo('Should call the callback function in method exec correctly')
})
