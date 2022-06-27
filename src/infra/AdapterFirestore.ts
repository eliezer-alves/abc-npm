import { db } from '../config/firebase'
import { DBService, DBServiceCode, DBServiceResponse } from '../data/protocols'
import { addDoc, collection } from 'firebase/firestore'

type ExpectedCreateResponse = {
  id: string
}

export class AdapterFirestore implements DBService {
  public response: DBServiceResponse<any> = {
    status: DBServiceCode.ok,
  }

  private changeResponseError(e: any): void {
    switch (e.code) {
      case 'PERMISSION_DENIED':
        this.response.status = DBServiceCode.unauthorized
        break
      default:
        this.response.status = DBServiceCode.badRequest
        break
    }
  }

  async create(params: any): Promise<DBServiceResponse<ExpectedCreateResponse>> {
    let firestoreResponse
    try {
      firestoreResponse = await addDoc(collection(db, params.ref), params.body)
    } catch (e: any) {
      this.changeResponseError(e)
      return this.response
    }

    if (firestoreResponse?.id) {
      this.response.status = DBServiceCode.created
      this.response.body = {
        id: firestoreResponse.id,
      }
    } else {
      this.response = {
        status: DBServiceCode.badRequest,
      }
    }

    return Promise.resolve(this.response)
  }
}
