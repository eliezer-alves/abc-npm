import { db } from '@/config/firebase'
import { addDoc, collection, doc, getDoc } from 'firebase/firestore'

export class AdapterFirestore {
  constructor(
    readonly ref: string,
    readonly columns: Array<string>,
    readonly primaryKey = 'id',
  ) {}

  async create(attr: any): Promise<string> {
    const entity: any = {}
    this.columns.map(column => {
      return (entity[column] = attr[column] ?? null)
    })
    const response = await addDoc(collection(db, this.ref), entity)

    return response.id
  }

  async find(id: string): Promise<any> {
    let entity: any = {}
    const docRef = doc(db, this.ref, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      entity = docSnap.data()
      entity.id = docSnap.id
    } else {
      return false
    }

    return entity
  }
}
