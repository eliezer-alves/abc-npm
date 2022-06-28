import { Find } from '../../../../data/usecases'
import { FindResult } from '../../../../domain/usecases'
import { DBServiceCode } from '../../../../data/protocols'
import { DBServiceSpy } from '../../mocks'
import { mockFindParam, mockFindResult } from '../../../domain/mocks'
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
  const mockedId = mockFindParam()

  return {
    sut,
    dbService,
    mockedId,
  }
}

describe('Delete', () => {
  it.todo('Should call DBServer with correct reference and params')

  it.todo('Should throw UnauthorizedError if DBService returns 401')

  it.todo('Should throw UnexpectedError if DBService returns 400')

  it.todo('Should throw UnexpectedError if DBService returns 500')

  it.todo('Should return a FindResult and params id is currect when DBService returns 200')

  it.todo('Should throw UnexpectedError when return of Find is empty but DBService returns 200')
})
