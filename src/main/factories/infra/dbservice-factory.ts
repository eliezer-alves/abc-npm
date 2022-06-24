import { AdapterFirestore } from '../../../infra/AdapterFirestore'

export const makeDBService = (option = 'firestore') => {
  switch (option) {
    case 'firestore':
      return new AdapterFirestore()
    default:
      return new AdapterFirestore()
  }
}
