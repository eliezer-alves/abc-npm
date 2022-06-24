import { DBService, DBServiceCode, DBServiceParams } from '@/data/protocols'
import { UnauthorizedError } from '@/domain/errors'
import { AdapterFirestore } from '@/infra/AdapterFirestore'
import { mockNewEntityParams } from '@/tests/domain/mocks'
import { FirestoreErrorCode, mockAddDocResponse, MockFirestore } from '@/tests/infra/mocks'

jest.mock('firebase/firestore')

const requestCreateNewEntity: DBServiceParams = {
  ref: 'rooms/',
  body: mockNewEntityParams(),
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

describe('AdapterFirestore', () => {
  test('Should call firebase with correct values', async () => {
    const { sut, mockFirestore } = makeSut()
    const mockedPush = mockFirestore.mockAddDock()

    await sut.create(requestCreateNewEntity)

    expect(mockedPush.addDoc).toHaveBeenCalledWith(undefined, requestCreateNewEntity.body)
  })

  test('Should return correct response', async () => {
    const { sut, mockFirestore } = makeSut()
    const addDockResponse = mockAddDocResponse()
    const expectedResponse = {
      status: DBServiceCode.created,
      body: addDockResponse,
    }

    mockFirestore.mockAddDock(addDockResponse)

    const response = await sut.create(requestCreateNewEntity)

    expect(expectedResponse).toEqual(response)
  })

  test('Should throw UnauthorizedError if firebase returns PERMISSION_DENIED', async () => {
    const { sut, mockFirestore } = makeSut()
    mockFirestore.throwError(FirestoreErrorCode.PERMISSION_DENIED)
    mockFirestore.mockAddDock()

    const promise = sut.create(requestCreateNewEntity)

    await expect(promise).rejects.toThrow(new UnauthorizedError())
  })
})
