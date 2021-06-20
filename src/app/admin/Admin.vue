<template>
  <div class="admin">
    <form v-if="!hasLoadedPeople" @submit.prevent="login">
      <input type="text" name="username" placeholder="username">
      <input type="password" name="password" placeholder="password">
      <button>Admin login</button>
    </form>

    <div v-else>
      <div
        v-for="person in people"
        :key="person.id"
        class="admin__person"
      >
        <div class="admin__person-data">
          {{ person.asString }}
        </div>

        <button @click="approvePerson(person)">Approve</button>
        <button @click="deletePerson(person)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import PeopleService from '@/services/people.service'
import FirebaseService from '@/services/firebase.service'

export default {
  data: () => ({
    people: [],
    hasLoadedPeople: false,
  }),

  methods: {
    async getPeople() {
      this.people = []
      const data = await PeopleService.getPeople('unapproved')
      this.people = data.map(person => {
        person.asString = JSON.stringify(person, null, 4)
        return person
      })
      this.hasLoadedPeople = true
    },

    async login(event) {
      try {
        await FirebaseService.login(event.target.elements.username.value, event.target.elements.password.value)
        await this.getPeople()
      } catch (error) {
        console.log(error)
      }
    },

    async approvePerson(person) {
      try {
        const personCopy = {...person}
        delete personCopy.id
        delete personCopy.asString
        await FirebaseService.db.collection('people').doc(person.id).set(personCopy)
        await this.deletePerson(person)
      } catch(error) {
        console.log(error)
      }
    },

    async deletePerson(person) {
      try {
        await FirebaseService.db.collection('unapproved').doc(person.id).delete()
        await this.getPeople()
      } catch(error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
.admin {
  max-width: 700px;
  margin: 0 auto;
}
.admin__person-data {
  white-space: pre-wrap;
  padding: 16px;
  background-color: #eee;
}
.admin__person {
  margin-bottom: 16px;
}
</style>