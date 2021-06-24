<template>
  <div class="add-modal">
    <div class="add-modal__container">
      <div class="add-modal__body">
        <div class="add-modal__fail" v-if="hasFailed">
          <p class="add-modal__message">
            Failed to add, please try again
          </p>

          <button class="se-button" @click="reset">Try again</button>
        </div>

        <div class="add-modal__success" v-else-if="hasSucceeded">
          <p class="add-modal__message">
            Success! your input will be visible once it's approved, you can update it at anytime using the same email address
          </p>

          <button class="se-button" @click="$emit('cancel')">Close</button>
        </div>

        <form
          v-else-if="step === 1"
          @submit.prevent="onMandatoryDataSubmission"
        >
          <div class="add-modal__form-group">
            <label for="email" class="add-modal__label">
              Email*
            </label>

            <p class="add-modal__help-text">
              الايميل هتقدر تستعمله ف انك تعدل البيانات
            </p>

            <input type="email" name="email" class="add-modal__input" required>
          </div>

          <div class="add-modal__form-group">
            <label for="company" class="add-modal__label">
              Company*
            </label>

            <p class="add-modal__help-text">
              الشركة اللى سافرت ليها
            </p>

            <input type="text" name="company" class="add-modal__input" required>
          </div>

          <div class="add-modal__form-group">
            <label for="travelPosition" class="add-modal__label">
              Position*
            </label>

            <p class="add-modal__help-text">
              المنصب اللى سافرت عليه
            </p>

            <input type="text" name="travelPosition" class="add-modal__input" required>
          </div>

          <div class="add-modal__form-group">
            <label for="travelCountry" class="add-modal__label">
              Travel country*
            </label>

            <input type="text" name="travelCountry" class="add-modal__input" required>
          </div>

          <div class="add-modal__form-group">
            <label for="firstJobAbroadDetails" class="add-modal__label">
              How I got my first job abroad*
            </label>

            <p class="add-modal__help-text">
              تفاصيل التجربة
            </p>

            <textarea rows="6" type="text" name="firstJobAbroadDetails" class="add-modal__input" required></textarea>
          </div>

          <div class="add-modal__controls">
            <button
              class="se-button"
              type="button"
              @click="$emit('cancel')"
            >
              Cancel
            </button>

            <button class="se-button">Next</button>
          </div>
        </form>

        <form v-else-if="step === 2" @submit.prevent="onOptionalDataSubmission">
          <h2 class="add-modal__title">Extra details (optional)</h2>
          <div class="add-modal__form-group">
            <label for="name" class="add-modal__label">
              Name
            </label>

            <input type="text" name="name" class="add-modal__input">
          </div>

          <div class="add-modal__form-group">
            <label for="linkedin" class="add-modal__label">
              Linkedin
            </label>

            <input type="text" name="linkedin" class="add-modal__input">
          </div>

          <div class="add-modal__form-group">
            <label for="source" class="add-modal__label">
              Source
            </label>
            <p class="add-modal__help-text">
              لينك للمصدر, فيديو او بوست على لينكد ان
            </p>

            <input type="text" name="source" class="add-modal__input">
          </div>

          <div class="add-modal__form-group">
            <label for="travelDate" class="add-modal__label">
              Travel date
            </label>
            <p class="add-modal__help-text">
              سافرت امتى؟
            </p>

            <input type="date" name="travelDate" class="add-modal__input add-modal__date">
          </div>

          <div class="add-modal__form-group">
            <label for="yearsOfExperienceAtTravel" class="add-modal__label">
              Years of experience at the time of travel
            </label>

            <p class="add-modal__help-text">
              كان عندك خبرة كام سنة وقت ما سافرت؟
            </p>

            <input type="number" name="yearsOfExperienceAtTravel" min="0" max="50" class="add-modal__input add-modal__number-input">
          </div>

          <div class="add-modal__form-group">
            <label for="generalDetails" class="add-modal__label">
              Other details
            </label>

            <textarea rows="6" type="text" name="generalDetails" class="add-modal__input"></textarea>
          </div>

          <div class="add-modal__controls">
            <button
              class="se-button"
              type="button"
              @click="$emit('cancel')"
            >
              Cancel
            </button>

            <button class="se-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import FirebaseService from '@/services/firebase.service'

export default {
  data: () => ({
    step: 1,
    formData: {},
    hasFailed: false,
    hasSucceeded: false,
  }),

  created() {
    document.body.style.overflow = 'hidden'
  },

  beforeDestroy() {
    document.body.style.overflow = ''
  },

  methods: {
    onMandatoryDataSubmission(event) {
      this.formData = this.getDataFromSubmitEvent(event)
      console.log(this.formData)
      this.step = 2
    },

    async onOptionalDataSubmission(event) {
      this.formData = {
        ...this.formData,
        ...this.getDataFromSubmitEvent(event),
        dateTimeAdded: new Date().getTime()
      }
      try {
        await FirebaseService.db.collection('pending').doc(this.formData.email).set(this.formData)
        this.hasSucceeded =  true
      } catch {
        this.hasFailed = true
      }
    },

    getDataFromSubmitEvent(event) {
      return Array.from(event.target.elements).reduce((acc, element) => {
        if (element.name) {
          acc[element.name] = element.value
        }
        return acc
      }, {})
    },

    reset() {
      this.step = 1
      this.hasFailed = false
      this.hasSucceeded = false
      this.formData = {}
    }
  }
}
</script>

<style lang="scss">
.add-modal {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: auto;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.8);
}

.add-modal__container {
  width: 100%;
  min-height: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.add-modal__body {
  background-color: #fff;
  border-radius: 4px;
  padding: 24px;
  isolation: isolate;
  width: 500px;
  max-width: 100%;
}

.add-modal__form-group {
  margin-bottom: 16px;
}

.add-modal__label {
  font-size: 14px;
  margin-bottom: 4px;
}

.add-modal__input {
  width: 100%;
  font-size: 16px;
  padding: 8px;
  border: 1px solid #aaa;
  border-radius: 2px;
}
.add-modal__help-text {
  font-size: 14px;
  color: #777;
  margin-bottom: 4px;
}

.add-modal__date {
  width: 160px;
}

.add-modal__number-input {
  width: 60px;
}

.add-modal__controls {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
}

.add-modal__title {
  margin-top: 0;
  margin-bottom: 16px;
}

.add-modal__success,
.add-modal__fail {
  font-size: 18px;
  text-align: center;
  padding: 64px;
}
.add-modal__message {
  margin-bottom: 16px;
}
</style>