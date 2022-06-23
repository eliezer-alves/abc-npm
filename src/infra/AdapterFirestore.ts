import { db } from '@/config/firebase'
import { DBService } from '@/data/protocols'
import { addDoc, collection } from 'firebase/firestore'

export class AdapterFirestore implements DBService {
  async create(params: any): Promise<any> {
    const response = await addDoc(collection(db, params.ref), params.body)

    return response.id
  }
}
