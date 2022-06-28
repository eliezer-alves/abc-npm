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
}

const makeSut = (ref: string = faker.internet.url()): SutTypes => {
  const dbService = new DBServiceSpy<FindResult>()
  const sut = new Find(ref, dbService)

  return {
    sut,
    dbService,
  }
}

describe('Find', () => {
  it('Should call DBServer with correct reference and params', async () => {
    const ref = faker.internet.url()
    const { sut, dbService } = makeSut(ref)
    const mockedId = faker.random.alphaNumeric(8)
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
    const { sut, dbService } = makeSut()
    dbService.response = {
      status: DBServiceCode.unauthorized,
    }
    const mockedId = faker.random.alphaNumeric(8)
    const promise = sut.exec(mockedId)

    await expect(promise).rejects.toThrow(new UnauthorizedError())
  })

  it.todo('Should throw UnexpectedError if DBService returns 400')

  it.todo('Should throw UnexpectedError if DBService returns 500')

  it.todo('Should return of Find is currect when DBService returns 200')

  it.todo('Should throw UnexpectedError when return of Find is empty but DBService returns 200')
})
