<template lang="pug">
  b-modal#login-modal(size='lg' title='Sign In Form')
    template(v-slot:modal-footer='{ ok }')
      b-button(size='sm' variant='info' @click='onSubmit()') Sign In

    b-overlay(:show='show' rounded='sm' :variant='variant' :opacity='opacity' :blur='blur')
      b-form.needs-validation.login-form(@submit.prevent='onSubmit' novalidate autocomplete='off')
        b-form-group#input-group-1(label='Email address:' label-for='input-1' minlength='5' description='We\'ll never share your email with anyone else.')
          b-form-input#input-1(v-model='form.email' type='email' required='' placeholder='Enter email')
          .valid-feedback Looks good!
          .invalid-feedback Email is required and min length is 5 charachter

        b-form-group#input-group-2(label='Password:' label-for='input-2' description='Your password is scure with us.')
          b-form-input#input-2(v-model='form.password' type='password' required minlength='6' placeholder='Enter Password' autocomplete='off')
          .valid-feedback Looks good!
          .invalid-feedback Password is required and min length is 6 charachter

      .d-none.p-3.mb-2.bg-danger.text-white.loggin-error

      hr.my-4

      b-jumbotron.m-0.p-1.pl-2.pr-2(bg-variant='info' text-variant='white' border-variant='dark')
        template(v-slot:header) Default Sign In Info
        template(v-slot:lead)
          | Email: admin@example.com
          br
          | Password: pass1234

        hr.my-4

        p Access to All Orders page. Have a nice day.
</template>

<script>
import ApiService from "@/services/ApiService";

export default {
  name: 'LoginForm',
  data() {
    return {
      show: false,
      variant: 'white',
      opacity: 0.55,
      blur: '2px',
      form: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    onSubmit() {
      let forms = document.querySelector('.login-form'),
          counter = 0;

      // Loop over them and prevent submission
      Array.prototype.filter.call(forms, form => {
          //If form has error
          if (!form.checkValidity()) {
            form.classList.add('not-valid');
            return false;
          }

          form.classList.add('was-validated');
          counter++;
      });

      if (counter == 2) {
        this.show = true;

        ApiService.login(JSON.stringify(this.form)).then(response => {
          let errorBlock = document.querySelector('.loggin-error');

          if (!response.data.logged) {
            errorBlock.innerText = 'ERROR! Please check your loggin data and try again.';
            errorBlock.classList.add('d-block');
            this.show = false;
            return;
          }

          errorBlock.classList.remove('d-block');
          this.$store.dispatch('userLoggedIn', true);
          this.show = false;
          this.$emit('logged-in', true);
          this.$bvModal.hide('login-modal');
        });
      }
    },
  },
}
</script>
