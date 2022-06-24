import { db } from '@/config/firebase'
import { DBService, DBServiceCode, DBServiceResponse } from '@/data/protocols'
import { UnauthorizedError } from '@/domain/errors'
import { addDoc, collection } from 'firebase/firestore'

type ExpectedCreateResponse = {
  id: string
}

export class AdapterFirestore implements DBService {
  public response: DBServiceResponse<any> = {
    status: DBServiceCode.ok,
  }

  async create(params: any): Promise<DBServiceResponse<ExpectedCreateResponse>> {
    let firestoreResponse
    try {
      firestoreResponse = await addDoc(collection(db, params.ref), params.body)
    } catch (e: any) {
      if (e.code === 'PERMISSION_DENIED') {
        throw new UnauthorizedError()
      }
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
