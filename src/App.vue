<template lang="pug">
  #app
    header.header
      Navigation

    b-container(fluid)
      router-view

      footer.footer
        Footer
</template>

<script>
// @ is an alias to /src
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Navigation,
    Footer
  }
}
</script>

<style lang="sass">
  //This style tags are required here in order for sass compiler and live reload to work
</style>
