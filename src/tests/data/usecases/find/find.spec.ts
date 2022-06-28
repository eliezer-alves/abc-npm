import { Find } from '../../../../data/usecases'
import { FindResult } from '../../../../domain/usecases'
import { DBServiceCode } from '../../../../data/protocols'
import { DBServiceSpy } from '../../mocks'
// import { mockFindResult } from '../../../domain/mocks'
import { UnauthorizedError, UnexpectedError } from '../../../../domain/errors'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: Find
  dbService: DBServiceSpy<FindResult>
  mockedId: string
}

const makeSut = (ref: string = faker.internet.url()): SutTypes => {
  const dbService = new DBServiceSpy<FindResult>()
  const sut = new Find(ref, dbService)
  const mockedId = faker.random.alphaNumeric(8)

  return {
    sut,
    dbService,
    mockedId,
  }
}

describe('Find', () => {
  it('Should call DBServer with correct reference and params', async () => {
    const ref = faker.internet.url()
    const { sut, dbService, mockedId } = makeSut(ref)
    // const mockedResult = mockFindResult(mockedId)

    dbService.response = {
      status: DBServiceCode.ok,
      // body: mockedResult,
    }

    await sut.exec(mockedId)

    expect(dbService.ref).toBe(ref)
    expect(dbService.body).toEqual({ id: mockedId })
  })

  it('Should throw UnauthorizedError if DBService returns 401', async () => {
    const { sut, dbService, mockedId } = makeSut()
    dbService.response = {
      status: DBServiceCode.unauthorized,
    }
    const promise = sut.exec(mockedId)

    await expect(promise).rejects.toThrow(new UnauthorizedError())
  })

  it('Should throw UnexpectedError if DBService returns 400', async () => {
    const { sut, dbService, mockedId } = makeSut()
    dbService.response = {
      status: DBServiceCode.badRequest,
    }
    const promise = sut.exec(mockedId)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if DBService returns 500', async () => {
    const { sut, dbService, mockedId } = makeSut()
    dbService.response = {
      status: DBServiceCode.serverError,
    }
    const promise = sut.exec(mockedId)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it.todo('Should return of Find is currect when DBService returns 200')

  it.todo('Should throw UnexpectedError when return of Find is empty but DBService returns 200')
})
