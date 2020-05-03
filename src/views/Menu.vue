<template lang="pug">
  span
    b-row
      b-col(cols='12')
        b-overlay(:show='show' rounded='sm' :variant='variant' :opacity='opacity' :blur='blur')
          div.mt-3.mb-3.checkbox_conatiner
            span(v-for='(value, index) in menuData')
              input(type='checkbox' v-model='selected' hidden :value='value.item' @change='setDisabledButton($event)' :data-id='value.id' :id='uniqueId("checkbox", value.id)' class='checkbox_conatiner_input')
              label(:for='uniqueId("checkbox", value.id)' class='checkbox_conatiner_label')
                b-card.overflow-hidden(no-body='' style='max-width: 550px;')
                  b-row(no-gutters='')
                    b-col(md='6')
                      b-card-img.rounded-0(:src='createImageSrc(value.image_name)' :alt='value.image_name')
                    b-col(md='6')
                      b-card-body(:title='value.item')
                        h6(class='card-subtitle mb-2 text-muted') {{ value.price }} &euro;
                        b-card-text
                          b-button.m-1.bg-info(v-b-toggle='uniqueId("collapse", value.id)') Pizza Details
                          b-collapse(:id='uniqueId("collapse", value.id)')
                            p.font-italic {{ value.description }}

                          .dropdown-divider

                          h5(class='card-subtitle mb-2 text-muted') How many do you want?
                          Amounts(:parent-id='value.id' v-bind:disabled-button='disabled')

          .d-flex.justify-content-center.mt-4
            b-button.btn-lg(variant='outline-info' @click='proccessOrderData') Make your order
</template>

<script>
import ApiService from "@/services/ApiService";
import Amounts from '@/components/Amounts.vue';

export default {
  name: 'Menu',

  components: {
    Amounts
  },

  data() {
    return {
      disabled: true,
      show: true,
      variant: 'white',
      opacity: 0.55,
      blur: '2px',
      selected: [], // Must be an array reference!
      orderedData: [], // Must be an array reference!
      menuData: null
    }
  },

  beforeCreate() {
    ApiService.getMenuItems().then(menuItems => {
      this.menuData = menuItems.data.data;
      this.show = false;
    })
  },

  methods: {
    uniqueId(name, number) {
      return `${name}-${number}`;
    },

    createImageSrc(imageName) {
      return require(`../assets/images/pizza-menu/${imageName}.png`);
    },

    proccessOrderData() {
      this.selected.forEach(item => {
        let filtered = this.menuData.filter(menuDataObj => {
           if (item === menuDataObj.item) {
             menuDataObj.amount = document.querySelector(`#parent-${menuDataObj.id}`).value;
             return menuDataObj;
           }
        });

        this.orderedData.push(filtered[0]);
      });
    },

    setDisabledButton(event) {
      let amountButtons = document.querySelectorAll(`.amount-button-${event.target.dataset.id}`);

      amountButtons.forEach(button => {
        button.disabled = !event.target.checked;
      });
    }
  }
}
</script>
