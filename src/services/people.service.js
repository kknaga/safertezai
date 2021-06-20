import FirebaseService from '@/services/firebase.service'

export default {
  async getPeople(collection = 'people') {
    const snapshot = await FirebaseService.db.collection(collection).orderBy('dateTimeAdded', 'desc').get()
    const data = snapshot.docs.map(person => {
      const data = person.data()
      data.id = person.id
      return data
    })
    return data
  }
}