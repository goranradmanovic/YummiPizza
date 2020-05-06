<template lang="pug">
  #nav
    b-navbar(toggleable='lg' type='dark' variant='secondary')
      b-navbar-brand(href='/')
        b-img.logo__img(:src='require("../assets/images/pizza-logo.jpg")' rounded alt='Pizza image')
      b-navbar-toggle(target='nav-collapse')
      b-collapse#nav-collapse(is-nav='')
        b-navbar-nav
          b-nav-item(to='/') Home
          b-nav-item(to='/menu') Pizza Menu
          b-nav-item(to='/allorders' v-if='checkUserSignIn') All Orders

        //- Right aligned nav items
        b-navbar-nav.ml-auto
          b-nav-form
            b-form-input.mr-sm-2(size='sm' placeholder='Search by Menu Title' v-model='searchMenuTitle' v-on:keyup='search' v-show='showSearchBox')

          b-nav-item-dropdown(text='Lang' right='')
            b-dropdown-item(href='#') EN
            b-dropdown-item(href='#') ES
            b-dropdown-item(href='#') RU
            b-dropdown-item(href='#') FA
          b-nav-item-dropdown(right='')
            //- Using 'button-content' slot
            template(v-slot:button-content='')
              em User
            b-dropdown-item(href='#' @click.prevent='openLoginModal()' v-if='!checkUserSignIn') Sign In
            b-dropdown-item(href='#' @click.prevent='singOut()' v-else) Sign Out
</template>

<script>
import ApiService from "@/services/ApiService";
import EventBus from '@/helpers/event-bus';

export default {
  name: 'Navigation',
  data() {
    return {
      searchMenuTitle: ''
    }
  },
  methods: {
    openLoginModal() {
      this.$bvModal.show('login-modal')
    },

    singOut() {
      ApiService.logout().then(response => {
        if(response.data.loggedout) {
          this.$store.dispatch('userLoggedOut', false);
          this.$emit('logged-out', true);
        }
      });
    },

    search() {
      if (this.searchMenuTitle.length >= 2) {
        EventBus.$emit('search-menu', this.searchMenuTitle);
      } else {
        EventBus.$emit('search-menu', false);
      }
    }
  },

  computed: {
    checkUserSignIn() {
      return this.$store.getters.loggedIn;
    },

    showSearchBox() {
      if (this.$route.path === '/menu') {
        return true;
      }

      return false;
    }
  }
}
</script>
