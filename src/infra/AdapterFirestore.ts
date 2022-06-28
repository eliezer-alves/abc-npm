import { db } from '../config/firebase'
import { DBService, DBServiceCode, DBServiceResponse } from '../data/protocols'
import { addDoc, collection, doc, getDoc } from 'firebase/firestore'

type ExpectedCreateResponse = {
  id: string
}

type ExpectedFindResponse = object

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

    return this.response
  }

  async find(params: any): Promise<DBServiceResponse<ExpectedFindResponse>> {
    let docSnap

    try {
      const docRef = doc(db, params.ref, params.body.id)
      docSnap = await getDoc(docRef)
    } catch (e: any) {
      this.changeResponseError(e)
      return this.response
    }

    if (docSnap.exists()) {
      this.response.status = DBServiceCode.ok
      this.response.body = {
        ...docSnap.data(),
        id: docSnap.id,
      }
    } else {
      this.response.status = DBServiceCode.badRequest
    }

    return this.response
  }
}
