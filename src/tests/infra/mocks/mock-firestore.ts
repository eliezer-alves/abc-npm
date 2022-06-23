import * as firestore from 'firebase/firestore'
import { faker } from '@faker-js/faker'

export const mockResponse = (): any => ({
  key: faker.random.alphaNumeric(10),
})

export enum FirebaseErrorCode {
  PERMISSION_DENIED = 'PERMISSION_DENIED',
}

export class FirebaseError extends Error {
  public code: string
  constructor(code = '', message = 'Firebase Error') {
    super(message)
    this.name = 'FirebaseError'
    this.code = code
  }
}

export class MockFirebaseDatabase {
  private mockedFirestore = firestore as jest.Mocked<typeof firestore>
  private isError = false
  private errorCode?: FirebaseErrorCode
  private errorMessage?: string = 'Mocked Firebase Error'

  public mockPush(expectedResponse: any = mockResponse) {
    if (this.isError) {
      this.mockedFirestore.addDoc.mockClear().mockImplementation(() => {
        throw new FirebaseError(this.errorCode, this.errorMessage)
      })
    } else {
      this.mockedFirestore.addDoc
        .mockClear()
        .mockResolvedValue(expectedResponse)
    }

    return this.mockedFirestore
  }

  public throwError(code: FirebaseErrorCode, message?: string): void {
    this.isError = true
    this.errorCode = code
    this.errorMessage = message
  }
}
