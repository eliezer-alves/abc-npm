import * as firestore from 'firebase/firestore'
import { faker } from '@faker-js/faker'

const mockId = (): string => {
  return faker.random.alphaNumeric(10)
}

export const mockAddDocResponse = (): any => ({
  id: mockId(),
})

export const mockGetDocResponse = (): any => ({
  id: mockId(),
  email: faker.internet.email(),
  password: faker.internet.password(),
})

export enum FirestoreErrorCode {
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  ANY = 'ANY',
}

export class FirestoreError extends Error {
  public code: string
  constructor(code = '', message = 'Firestore Error') {
    super(message)
    this.name = 'FirestoreError'
    this.code = code
  }
}

export class MockFirestore {
  private mockedFirestore = firestore as jest.Mocked<typeof firestore>
  private isError = false
  private errorCode?: FirestoreErrorCode
  private errorMessage?: string = 'Mocked Firestore Error'

  public mockAddDock(expectedResponse: any = mockAddDocResponse()) {
    if (this.isError) {
      this.mockedFirestore.addDoc.mockClear().mockImplementation(() => {
        throw new FirestoreError(this.errorCode, this.errorMessage)
      })
    } else {
      this.mockedFirestore.addDoc.mockResolvedValue(expectedResponse)
    }

    return this.mockedFirestore
  }

  public mockGetDoc(id = mockId(), expectedResponse = mockGetDocResponse(), exists = true) {
    if (this.isError) {
      this.mockedFirestore.getDoc.mockClear().mockImplementation(() => {
        throw new FirestoreError(this.errorCode, this.errorMessage)
      })
    } else {
      this.mockedFirestore.getDoc.mockImplementation(
        jest.fn().mockImplementation(() =>
          Promise.resolve({
            id: id,
            data: () => {
              return expectedResponse
            },
            exists: () => {
              return exists
            },
          }),
        ),
      )
    }

    return this.mockedFirestore
  }

  public throwError(code: FirestoreErrorCode, message?: string): void {
    this.isError = true
    this.errorCode = code
    this.errorMessage = message
  }
}
