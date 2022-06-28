import { DBService, DBServiceCode, DBServiceParams } from '../../data/protocols'
import { AdapterFirestore } from '../../infra/AdapterFirestore'
import { mockFindParam } from '../domain/mocks'
import { FirestoreErrorCode, MockFirestore, mockGetDocResponse } from './mocks'

jest.mock('firebase/firestore')

const requestFindNewEntity: DBServiceParams = {
  ref: 'users-test/',
  body: {
    id: mockFindParam(), //'zbVW56w5Dx0g4oYSIehR',
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

describe('AdapterFirestoreFind', () => {
  it('Should return correct response', async () => {
    const { sut, mockFirestore } = makeSut()
    const expectedBodyResponse = mockGetDocResponse()
    mockFirestore.mockGetDoc(expectedBodyResponse.id, expectedBodyResponse)

    const result = await sut.find(requestFindNewEntity)

    expect(result.body).toEqual(expectedBodyResponse)
    expect(result.status).toEqual(DBServiceCode.ok)
  })

  it('Should returns 401 if firebase returns PERMISSION_DENIED', async () => {
    const { sut, mockFirestore } = makeSut()
    mockFirestore.throwError(FirestoreErrorCode.PERMISSION_DENIED)
    mockFirestore.mockGetDoc()

    const response = await sut.find(requestFindNewEntity)

    await expect(response.status).toBe(DBServiceCode.unauthorized)
  })

  it('Should returns 400 if firebase returns Error', async () => {
    const { sut, mockFirestore } = makeSut()
    mockFirestore.throwError(FirestoreErrorCode.ANY)
    mockFirestore.mockGetDoc()

    const response = await sut.find(requestFindNewEntity)

    await expect(response.status).toBe(DBServiceCode.badRequest)
  })
})
