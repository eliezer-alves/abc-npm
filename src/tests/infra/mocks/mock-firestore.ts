import * as firestore from 'firebase/firestore'
import { faker } from '@faker-js/faker'

export const mockResponse = (): any => ({
  key: faker.random.alphaNumeric(10),
})

export enum FirestoreErrorCode {
  PERMISSION_DENIED = 'PERMISSION_DENIED',
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

  public mockPush(expectedResponse: any = mockResponse) {
    if (this.isError) {
      this.mockedFirestore.addDoc.mockClear().mockImplementation(() => {
        throw new FirestoreError(this.errorCode, this.errorMessage)
      })
    } else {
      this.mockedFirestore.addDoc
        .mockClear()
        .mockResolvedValue(expectedResponse)
    }

    return this.mockedFirestore
  }

  public throwError(code: FirestoreErrorCode, message?: string): void {
    this.isError = true
    this.errorCode = code
    this.errorMessage = message
  }
}
