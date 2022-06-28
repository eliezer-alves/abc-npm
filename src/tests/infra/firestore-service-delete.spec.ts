import { DBService, DBServiceCode, DBServiceParams } from '../../data/protocols'
import { AdapterFirestore } from '../../infra/AdapterFirestore'
import { mockDeleteParam } from '../domain/mocks'
import { FirestoreErrorCode, MockFirestore } from './mocks'

jest.mock('firebase/firestore')

const requestFindNewEntity: DBServiceParams = {
  ref: 'users-test/',
  body: {
    id: mockDeleteParam(),
  },
}

type SutTypes = {
  sut: DBService
  mockFirestore: MockFirestore
}

const makeSut = (): SutTypes => {
  const sut = new AdapterFirestore()
  const mockFirestore = new MockFirestore()

  return {
    sut,
    mockFirestore,
  }
}

describe('AdapterFirestoreDelete', () => {
  it('Should return correct response', async () => {
    const { sut, mockFirestore } = makeSut()
    mockFirestore.mockDeleteDoc()

    const result = await sut.delete(requestFindNewEntity)

    expect(result.status).toEqual(DBServiceCode.ok)
  })

  it('Should returns 401 if firebase returns PERMISSION_DENIED', async () => {
    const { sut, mockFirestore } = makeSut()
    mockFirestore.throwError(FirestoreErrorCode.PERMISSION_DENIED)
    mockFirestore.mockDeleteDoc()

    const response = await sut.delete(requestFindNewEntity)

    await expect(response.status).toBe(DBServiceCode.unauthorized)
  })

  it('Should returns 400 if firebase returns Error', async () => {
    const { sut, mockFirestore } = makeSut()
    mockFirestore.throwError(FirestoreErrorCode.ANY)
    mockFirestore.mockDeleteDoc()

    const response = await sut.delete(requestFindNewEntity)

    await expect(response.status).toBe(DBServiceCode.badRequest)
  })
})
