<template lang="pug">
  b-row
    b-col
      b-jumbotron.mt-3.mb-3.p-3(header='The Yummi Pizza' lead='Best Pizza and quickest delivery in town!')
      b-img.mb-3(:src='require("../assets/images/pizza.jpg")' fluid-grow rounded alt='Pizza image')
</template>

<script>
export default {
  name: 'Home',
  components: {
  }
}
</script>
