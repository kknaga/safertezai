ل<template>
  <div class="home">
    <div class="home__controls">
      <input
        type="text"
        placeholder="Search by anything"
        class="home__search-input"
        @input="updateQuery"
      >

      <button
        class="home__add-button"
        @click="isShowingAddModal = true"
      >
        <span>Add your experience</span>
      </button>
    </div>

    <PeopleList :people="filteredPeople" />

    <AddModal
      v-if="isShowingAddModal"
      @cancel="isShowingAddModal = false"
    />
  </div>
</template>

<script>
import PeopleList from '@/app/home/components/PeopleList.vue'
import AddModal from '@/app/home/components/AddModal.vue'
import PeopleService from '@/services/people.service'

export default {
  components: {
    AddModal,
    PeopleList,
  },

  data: () => ({
    people: [],
    query: '',
    timeout: undefined,
    isShowingAddModal: false,
  }),

  computed: {
    filteredPeople() {
      return this.people.filter(person => {
        return Object.keys(person).some(key => {
          let value = person[key]

          if (Array.isArray(value)) {
            value = value.toString().toLowerCase()
          }

          if (typeof value === 'string') {
            return value.toLowerCase?.().includes(this.query.toLowerCase()) 
          }

          return false
        })
      })
    }
  },

  created() {
    this.getPeople()
  },

  methods: {
    async getPeople() {
      this.people = await PeopleService.getPeople()
    },

    updateQuery(event) {
      clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {
        this.query = event.target.value
      }, 500);
    }
  }
}
</script>

<style lang="scss">
.home {
  max-width: 900px;
  margin: 0 auto;
}

.home__controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  flex-direction: column-reverse;
  gap: 32px;
  align-items: flex-end;
  padding: 0 8px;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 0;
  }
}

.home__search-input {
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #ddd;
  padding: 8px;
  outline: none;
  width: 250px;

  &:hover,
  &:focus {
    border-bottom-color: #333;
  }
}

.home__add-button {
  margin-left: 8px;
  background-color: transparent;
  font-weight: 600;
  display: flex;
  align-items: center;
  border: none;
  position: relative;
  cursor: pointer;
  background-color: transparent;
  border-radius: 4px;
  padding: 8px 16px;

  &::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 8px;
    background-image: url(~@/assets/icons/plus.svg);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  &:hover,
  &:focus {
    background-color: #ddd;
  }
}
</style>