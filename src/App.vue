<template lang="pug">
  #app
    LoginForm(@logged-in='showAlert')

    header.header
      Navigation(@logged-out='showLoggedOutAlert')

    b-container(fluid)
      b-alert.mt-3(:show='dismissCountDown' dismissible fade variant='success') Success! You are sign in.
      b-alert.mt-3(:show='dismissCountDownLoggedOut' dismissible fade variant='success') Success! You are sign out.

      router-view

      footer.footer
        Footer
</template>

<script>
// @ is an alias to /src
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'
import LoginForm from '@/components/LoginForm.vue'
import ApiService from "@/services/ApiService";

export default {
  name: 'Home',
  components: {
    Navigation,
    Footer,
    LoginForm
  },
  data() {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
      dismissSecsLoggedOut: 10,
      dismissCountDownLoggedOut: 0,
      currentyRatesUrl: 'https://api.exchangeratesapi.io/latest'
    }
  },
  methods: {
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },

    showLoggedOutAlert() {
      this.dismissCountDownLoggedOut = this.dismissSecsLoggedOut
    },

    exchangeRates() {
      ApiService.getExchangeRates(this.currentyRatesUrl).then(response => {
        this.$store.dispatch('currentRateExcange', response.rates.USD);
      });
    }
  },

  mounted() {
    this.exchangeRates();
  }
}
</script>

<style lang="sass">
  //This style tags are required here in order for sass compiler and live reload to work
</style>
