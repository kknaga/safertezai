<template>
  <div class="people-list">
    <Person
      v-for="person of people"
      :key="person.id"
      :person="person"
    />
  </div>
</template>

<script>
import Person from '@/app/home/components/Person.vue'

export default {
  components: {
    Person,
  },

  props: {
    people: {
      required: true,
      type: Array,
    }
  }
}
</script>

<style>
.people-list {
  margin-bottom: 32px;
}
</style>