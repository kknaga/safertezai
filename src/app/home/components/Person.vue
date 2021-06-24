<template>
  <div class="person">
    <button
      class="person__toggle"
      @click="isOpen = !isOpen"
    >
      <p class="person__name">{{ person.name || 'Unnamed person' }} </p>
      <p class="person__pills">
        <span title="Title at the time of travel" class="person__pill person__pill--position">
          <img src="@/assets/icons/id.png" width="16" height="16" alt="travel position">
          <span>{{ person.travelPosition }}</span>
        </span>

        <span class="person__pill person__pill--country">
          <img src="@/assets/icons/pin.png" width="16" height="16" alt="travel country">
          <span>{{ person.travelCountry }}</span>
        </span>

        <span title="Company at the time of travel" class="person__pill person__pill--company">
          <img src="@/assets/icons/company.png" width="16" height="16" alt="travel company">
          <span>{{ person.company }}</span>
        </span>

        <img
          :class="{'people__chevron--open': isOpen }"
          src="@/assets/icons/chevron.svg"
          width="16"
          height="16"
          alt="toggle more details"
          class="people__chevron"
        >
      </p>
    </button>

    <div v-if="isOpen" class="person__details">
      <dl v-if="person.yearsOfExperienceAtTravel" class="person__dl">
        <dt class="person__dt">
          Years of experience at the time of travel
        </dt>

        <dd class="person__dd" >
          {{ person.yearsOfExperienceAtTravel }}
        </dd>
      </dl>

      <dl v-if="person.travelDate" class="person__dl">
        <dt class="person__dt">
          Travel date
        </dt>

        <dd class="person__dd" >
          {{ person.travelDate }}
        </dd>
      </dl>

      <dl v-if="linkedin" class="person__dl">
        <dt class="person__dt">
          Linkedin
        </dt>

        <dd class="person__dd person__link" >
          <a :href="linkedin" target="_blank">
            {{ linkedin }}
          </a>
        </dd>
      </dl>

      <dl class="person__dl">
        <dt class="person__dt">
          How I got my first job abroad
        </dt>

        <dd class="person__dd" :dir="fjaDirection">
          <a v-if="person.source" :href="person.source">المصدر</a><br>
          {{ person.firstJobAbroadDetails && person.firstJobAbroadDetails.trim() }}
        </dd>
      </dl>

      <dl v-if="person.generalDetails" class="person__dl">
        <dt class="person__dt">
          Other details
        </dt>

        <dd class="person__dd" :dir="otherDetailsDirection">
          {{ person.generalDetails && person.generalDetails.trim() }}
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    person: {
      required: true,
      type: Object,
    }
  },

  data: () => ({
    isOpen: false,
    fjaDirection: 'ltr',
    otherDetailsDirection: 'ltr',
    linkedin: '',
  }),

  created() {
    this.fjaDirection = this.getDirection(this.person.firstJobAbroadDetails)
    this.otherDetailsDirection = this.getDirection(this.person.generalDetails)
    if (this.person.linkedin) {
      this.linkedin = this.getLinkedin(this.person.linkedin)
    }
  },

  methods: {
    getDirection(text) {
      return text?.match(/[\u0621-\u064A]/) ? 'rtl' : 'ltr'
    },

    getLinkedin(handle) {
      const splitHandle = handle.match(/in\/[a-z-0-9]+/)
      const cleanedHandle = splitHandle?.[0].slice(3) || handle.trim()

      return `https://www.linkedin.com/in/${encodeURIComponent(cleanedHandle)}/`
    }
  }
}
</script>

<style lang="scss">
.person {

  &:not(:last-child) {
    border-bottom: 2px solid #ddd;
  }
}

.person__toggle {
  width: 100%;
  background-color: transparent;
  text-align: left;
  padding: 16px;
  border: none;
  display: flex;
  justify-content: space-between;
  outline: none;
  cursor: pointer;
  flex-direction: column;

  &:hover,
  &:focus {
    background-color: #eee;
  }

  @media (min-width: 768px) {
    flex-direction: row;
  align-items: center;
  }
}

.person__name {
  font-size: 1.2rem;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
}

.person__pills {
  flex-direction: column;
  display: flex;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    width: unset;
  }
}

.person__pill {
  font-size: 15px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  @media (min-width: 768px) {
    &+ .person__pill {
      margin-left: 16px;
    }
  }

  &--position {
    color: #084298;
    border-color: #b6d4fe;
  }

  &--country {
    color: #0f5132;
    border-color: #badbcc;
  }

  &--company {
    color: #664d03;
    border-color: #ffecb5;
  }
}

.people__chevron {
  transition: transform 0.3s;
  align-self: center;
  margin-top: 16px;

  &--open {
    transform: rotate(180deg);
  }

  @media (min-width: 768px) {
    margin-left: 16px;
    margin-top: 0;
  }
}

.person__details {
  padding: 16px;
  border-left: 4px solid #0f5132;
}

.person__dl {
  margin-top: 0;
  margin-bottom: 0;

  &:not(:last-child) {
    margin-bottom: 16px;
  }
}

.person__link {
  word-break: break-all;
  word-break: break-word;
}

.person__dt {
  color: #555;
  font-size: 14px;
}

.person__dd {
  font-size: 18px;
  margin-inline-start: 0;
  white-space: pre-line;
}
</style>