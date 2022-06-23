import { DBService, DBServiceParams } from '@/data/protocols'
import { UnauthorizedError } from '@/domain/errors'
import { AdapterFirestore } from '@/infra/AdapterFirestore'
import { mockNewEntityParams } from '@/tests/domain/mocks'
import { FirestoreErrorCode, MockFirestore } from '@/tests/infra/mocks'

jest.mock('firebase/database')

const requestCreateRoom: DBServiceParams = {
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
    const mockedPush = mockFirestore.mockPush()

    await sut.create(requestCreateRoom)

    expect(mockedPush.addDoc).toHaveBeenCalledWith(
      undefined,
      requestCreateRoom.body,
    )
  })

  test('Should return correct response', async () => {
    const { sut, mockFirestore } = makeSut()
    mockFirestore.mockPush(requestCreateRoom.body)

    const response = await sut.create(requestCreateRoom)

    expect(requestCreateRoom.body).toEqual(response)
  })

  test('Should throw UnauthorizedError if firebase returns PERMISSION_DENIED', async () => {
    const { sut, mockFirestore } = makeSut()
    mockFirestore.throwError(FirestoreErrorCode.PERMISSION_DENIED)
    mockFirestore.mockPush()

    const promise = sut.create(requestCreateRoom)

    await expect(promise).rejects.toThrow(new UnauthorizedError())
  })
})
