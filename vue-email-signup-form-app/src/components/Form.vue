<template>
  <form @submit.prevent="onSubmit">
    <input type="email" v-model="email" />
    <input v-model="enterCompetition" value="yes" type="radio" name="enterCompetition" />
    <input v-model="enterCompetition" value="no" type="radio" name="enterCompetition" />
    <button type="submit">Submit</button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      email: null,
      enterCompetition: 'yes'
    }
  },
  methods: {
    onSubmit(event) {
      this.axios.post('http://demo7437963.mockable.io/validate', {
        email: this.email,
        enterCompetition:  this.enterCompetition === 'yes'
      })
      this.$emit('form-submitted')
    }
  }
}
</script>
