<template>
  <div class="admin">
    <form v-if="!hasLoadedPeople" class="admin__login-form" @submit.prevent="login">
      <input class="admin__input" type="text" name="username" placeholder="username">
      <input class="admin__input" type="password" name="password" placeholder="password">
      <button class="se-button">Admin login</button>
    </form>

    <div v-else>
      <div
        v-for="person in people"
        :key="person.id"
        class="admin__person"
      >
        <template v-for="(value, key) in person">
          <dl
            v-if="value"
            :key="key"
          >
            <dt>{{ key }}</dt>
            <dd>{{ value }}</dd>
          </dl>
        </template>

        <div class="admin__controls">
          <button class="se-button admin__delete-button" @click="softDelete(person)">Delete</button>
          <button class="se-button" @click="approvePerson(person)">Approve</button>
        </div>
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
      this.people = await PeopleService.getPeople('pending')
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
        await FirebaseService.db.collection('people').doc(person.id).set(personCopy)
        await this.deletePerson(person)
      } catch(error) {
        console.log(error)
      }
    },

    async softDelete(person) {
      try {
        const personCopy = {...person}
        delete personCopy.id
        await FirebaseService.db.collection('unapproved').doc(person.id).set(personCopy)
        await this.deletePerson(person)
      } catch(error) {
        console.log(error)
      }
    },

    async deletePerson(person) {
      try {
        await FirebaseService.db.collection('pending').doc(person.id).delete()
        await this.getPeople()
      } catch(error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.admin {
  max-width: 700px;
  margin: 0 auto;
}
.admin__person {
  margin-bottom: 16px;
  white-space: pre-wrap;
  padding: 8px;
  background-color: #eee;
}

.admin__login-form {
  max-width: 300px;
  margin: 32px auto;
}

.admin__input {
  margin-bottom: 16px;
  width: 100%;
  padding: 8px;
}

.admin__controls {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}

.admin__delete-button {
  background-color: crimson;
}
</style>