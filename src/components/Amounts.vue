<template lang="pug">
  .input-group
    .input-group-prepend
      button.btn.btn-outline-info.plus-btn(type='button' @click='increaseAmount' :class='"amount-button-" + parentId' :disabled='disabledButton') &plus;
    input.form-control.text-center.amountField(type='text' readonly :id='"parent-" + parentId' :value='amount' placeholder='Enter your amount' aria-label='Enter your amount')
    .input-group-append
      button.btn.btn-outline-info.minus-btn(type='button' @click='decreaseAmount' :class='"amount-button-" + parentId'  :disabled='disabledButton') &minus;
</template>

<script>
export default {
  name: 'Amounts',
  props: ['disabledButton', 'parentId'],
  data() {
    return {
      amount: null
    }
  },

  methods: {
    increaseAmount() {
      this.amount++;
    },

    decreaseAmount() {
      if (this.amount == 0 || this.amount == null) {
        return;
      } else if (this.amount == 1) {
        this.amount = 1;
        return;
      }

      this.amount--;
    }
  }
}
</script>
