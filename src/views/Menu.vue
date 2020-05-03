<template lang="pug">
  b-row
    b-col
      b-overlay(:show='show' rounded='sm' :variant='variant' :opacity='opacity' :blur='blur')

      b-form-group.mt-3.mb-3(label='')
        b-form-checkbox-group#checkbox-group-1(v-model='selected' :options='options' name='flavour-1')
      div
        | Selected:
        strong {{ selected }}
</template>

<script>
import ApiService from "@/services/ApiService";

export default {
  name: 'Menu',
  data() {
    return {
      show: true,
      variant: 'white',
      opacity: 0.85,
      blur: '2px',
      selected: [], // Must be an array reference!
      options: []
    }
  },

  beforeCreate() {
    ApiService.getMenuItems().then(menuItems => {
      menuItems.data.data.map(value => {
        let optionsItem = {text: '', value: ''};
        optionsItem.text = value.item;
        optionsItem.value = value.item;

        this.options.push(optionsItem);
      });

      this.show = false;
    });
  }
}
</script>
