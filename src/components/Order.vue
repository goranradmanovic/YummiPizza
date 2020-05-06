<template lang="pug">
  b-modal(id='modal-xl' scrollable no-close-on-esc no-close-on-backdrop hide-header-close size='xl' title='Your Orders')
    template(v-slot:modal-footer='{ ok, cancel }')
      b-button(size='sm' variant='info' @click='onSubmit()') Place Order
      b-button(size='sm' variant='danger' @click='cancelOrders(), cancel()') Cancel Order

    b-overlay(:show='show' rounded='sm' :variant='variant' :opacity='opacity' :blur='blur')
      b-row
        b-col(lg='4' sm='12' md='12')
          b-form#contactForm.needs-validation(novalidate)
            b-form-group#name-input-group-1(label='Full Name:' label-for='name-input-1')
              b-form-input#name-input-1(v-model.trim='form.name' required minlength='5' placeholder='Enter your full name')
              .valid-feedback Looks good!
              .invalid-feedback Name is required and min length is 5 charachter

            b-form-group#input-group-2(label='Address:' label-for='input-2')
              b-form-input#input-2(v-model='form.address' required  minlength='5' placeholder='Enter your address')
              .valid-feedback Looks good!
              .invalid-feedback Address is required and min length is 5 charachter

            b-form-group#input-group-3(label='City:' label-for='input-3')
              b-form-input#input-3(v-model='form.city' required  minlength='3' placeholder='Enter your city')
              .valid-feedback Looks good!
              .invalid-feedback City is required and min length is 3 charachter

        b-col(lg='8' sm='12' md='12')
          b-table(striped hover responsive :items='items' :fields='fields')

          hr.my-4

          b-card(title='Total Bill' sub-title='Total pizza amounts, price + delevery')
            hr.my-4

            b-card-text.font-weight-bold.text-monospace Total Amounts: &nbsp;
              .badge.badge-info.p-1.pl-2.pr-2.order-info {{ ordersTotal.amounts }}

            b-card-text.font-weight-bold.text-monospace Total Pizza Price: &nbsp;
              .badge.badge-info.p-1.pl-2.pr-2.order-info {{ ordersTotal.item_total_pizza_price }} &euro;

            b-card-text.font-weight-bold.text-monospace Delivery Price: &nbsp;
              .badge.badge-info.p-1.pl-2.pr-2.order-info {{ ordersTotal.delivery_price }} &euro;

            b-card-text.font-weight-bold.text-monospace Total Price: &nbsp;
              .badge.badge-info.p-1.pl-2.pr-2.order-info {{ ordersTotal.total_price }} &euro; &asymp; ({{ ordersTotal.total_price_in_usd }} &dollar;)
</template>

<script>
import EventBus from '@/helpers/event-bus';
import ApiService from "@/services/ApiService";

export default {
  name: 'Order',
  props: ['orders'],
  data() {
    return {
      fields: [{key: 'item', sortable: true}, 'description', 'price', 'amount'],
      show: false,
      variant: 'white',
      opacity: 0.55,
      blur: '2px',
      items: null,
      form: {
        name: '',
        address: '',
        city: '',
      },
      ordersTotal: {
        amounts: 0,
        delivery_price: 2.99,
        total_price: '',
        item_total_pizza_price: '',
        total_price_in_usd: '',
      },
      currentConvertRate: null,
      formatedOrderData: {
        client_name: '',
        client_address: '',
        client_city: '',
        item: [],
        item_quantity: '',
        item_total_price: '',
        item_delivery_price: ''
      }
    }
  },

  methods: {

    onSubmit() {
      let forms = document.querySelector('.needs-validation'),
          counter = 0;

      // Loop over them and prevent submission
      Array.prototype.filter.call(forms, form => {

          //If form has error
          if (!form.checkValidity()) {
            console.log('error')
            form.classList.add('not-valid');
            return false;
          }

          form.classList.add('was-validated');
          counter++;
      });

      if (counter === 3) {
        this.show = true;
        this.formatedOrderData.client_name = this.form.name;
        this.formatedOrderData.client_address = this.form.address;
        this.formatedOrderData.client_city = this.form.city;

        this.orders.forEach(order => {
          this.formatedOrderData.item.push(order.item);
        });

        this.formatedOrderData.item_quantity = this.ordersTotal.amounts;
        this.formatedOrderData.item_total_price = this.ordersTotal.total_price;
        this.formatedOrderData.item_delivery_price = this.ordersTotal.delivery_price;

        //API post order call
        ApiService.postPizzaOrderData(JSON.stringify(this.formatedOrderData)).then(() => {
          this.show = false;
          this.$emit('show-alert', true);
          this.resetOrderData();
          EventBus.$emit('reset-amount', 1);
        });
      }
    },

    ordersCalculations(orders) {
      let pizzaAmounts = 0,
          pizzaTotalPrice = 0;

      orders.forEach(item => {
        pizzaAmounts += parseInt(item.amount);
        pizzaTotalPrice += (item.price * parseInt(item.amount));
      });

      this.ordersTotal.amounts = pizzaAmounts;
      this.ordersTotal.item_total_pizza_price = pizzaTotalPrice.toFixed(2);
      this.ordersTotal.total_price = (pizzaTotalPrice + this.ordersTotal.delivery_price).toFixed(2);
    },

    convertEURToUSD() {
      this.ordersTotal.total_price_in_usd = (this.ordersTotal.total_price * this.currentConvertRate).toFixed(2);
    },

    setCurrentConvertRate() {
      this.currentConvertRate = this.$store.getters.getCurrentRate;
    },

    cancelOrders() {
      this.$emit('cancel-orders', true);
    },

    resetOrderData() {
      this.$bvModal.hide('modal-xl');
      this.cancelOrders();

      this.form = {
        name: '',
        address: '',
        city: ''
      },

      this.items = [];

      this.ordersTotal = {
        amounts: 0,
        delivery_price: 2.99,
        total_price: '',
        total_price_in_usd: ''
      }

      this.formatedOrderData = {
        client_name: '',
        client_address: '',
        client_city: '',
        item: [],
        item_quantity: '',
        item_total_price: '',
        item_delivery_price: ''
      }
    }
  },

  mounted() {
    EventBus.$on('new-orders', payLoad => {
      this.ordersCalculations(payLoad);
      this.convertEURToUSD();
      this.items = this.orders;
    });


  },

  created() {
    this.setCurrentConvertRate();
  }
}
</script>
