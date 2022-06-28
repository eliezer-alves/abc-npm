import { Delete } from '../../../../data/usecases'
import { FindResult } from '../../../../domain/usecases'
import { DBServiceCode } from '../../../../data/protocols'
import { DBServiceSpy } from '../../mocks'
import { mockDeleteParam, mockDeleteResult } from '../../../domain/mocks'
import { UnauthorizedError, UnexpectedError } from '../../../../domain/errors'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: Delete
  dbService: DBServiceSpy<FindResult>
  mockedId: string
}

const makeSut = (ref: string = faker.internet.url()): SutTypes => {
  const dbService = new DBServiceSpy<FindResult>()
  const sut = new Delete(ref, dbService)
  const mockedId = mockDeleteParam()

  return {
    sut,
    dbService,
    mockedId,
  }
}

describe('Delete', () => {
  it('Should call DBServer with correct reference and params', async () => {
    const ref = faker.internet.url()
    const { sut, dbService, mockedId } = makeSut(ref)
    const mockedResult = mockDeleteResult(mockedId)

    dbService.response = {
      status: DBServiceCode.ok,
      body: mockedResult,
    }

    await sut.exec(mockedId)

    expect(dbService.ref).toBe(ref)
    expect(dbService.body).toEqual({ id: mockedId })
  })

  it.todo('Should throw UnauthorizedError if DBService returns 401')

  it.todo('Should throw UnexpectedError if DBService returns 400')

  it.todo('Should throw UnexpectedError if DBService returns 500')

  it.todo('Should return a FindResult and params id is currect when DBService returns 200')

  it.todo('Should throw UnexpectedError when return of Find is empty but DBService returns 200')
})
