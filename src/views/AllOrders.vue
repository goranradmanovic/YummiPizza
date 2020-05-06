<template lang="pug">
  b-row
    b-col
      b-card.mb-2.mt-3(title='All Orderse' tag='article' style='max-width: unset')
        b-card-text
          b-overlay(:show='show' rounded='sm' :variant='variant' :opacity='opacity' :blur='blur')
            b-table(striped hover :items='allOrders' :fields='fields')

            .dropdown-divider.mt-2.mb-2

            .text-right.font-weight-bold.text-capitalize Total profit: &nbsp;
              .badge.badge-primary.p-2.total-profit {{ totalProfit }} &euro;
</template>

<script>
import ApiService from "@/services/ApiService";

export default {
  name: 'AllOrders',
  data() {
    return {
      fields: [
        {
          key: 'client_name',
          label: 'Name'
        },
        {
          key: 'client_address',
          label: 'Address'
        },
        {
          key: 'client_city',
          label: 'City'
        },
        {
          key: 'item',
          label: 'Order'
        },
        {
          key: 'created_at',
          label: 'Date',
        },
        {
          key: 'item_quantity',
          label: 'Amounts'
        },
        {
          key: 'item_delivery_price',
          label: 'Delivery Price'
        },
        {
          key: 'item_total_price',
          label: 'Order Price',
          variant: 'success'
        },
      ],
      show: false,
      variant: 'white',
      opacity: 0.55,
      blur: '2px',
      allOrders: [],
      totalProfit: null
    }
  },

  methods: {
    getAllOrders() {
      this.show = true;

      ApiService.getAllOrders().then(response => {
        response.data.data.forEach((order, index) => {
          response.data.data[index].item = order.item.join(', ');
          response.data.data[index].created_at = this.formatDateOfOrder(order.created_at);
          this.totalProfit += order.item_total_price;
        });

        this.allOrders = response.data.data;
        this.show = false;
      });
    },

    formatDateOfOrder(timestamp) {
      let date = new Date(timestamp);

      return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    }
  },

  mounted() {
    this.getAllOrders();
  }
}
</script>
