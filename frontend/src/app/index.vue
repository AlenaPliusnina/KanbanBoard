<template>
<div :class="'app'">
  <div v-if="authorized">
    <div v-if="user">
      <Navbar :user="user"></Navbar>
      <KanbanBoard :user="user"></KanbanBoard>
    </div>
    <div v-else class="d-flex flex-wrap justify-content-center" style="margin: 40vh auto 30vh auto; max-width: 10vw;">
      <h4 class="text-success mb-2">Loading...</h4>
      <b-spinner class="text-center" variant="success" label="Spinning"></b-spinner>
    </div>
  </div>
  <div v-else class="d-flex flex-wrap justify-content-center" style="margin: 40vh auto 30vh auto; max-width: 50vw;">
    <h4 class="text-light text-center mb-3">To access the service, log in with your Google account</h4>
    <g-signin-button v-if="!user" :params="googleSignInParams"
                     @success="onGoogleSignInSuccess" @error="onGoogleSignInError">
      <button class="btn btn-block btn-success"> Log in </button>
    </g-signin-button>
  </div>
</div>
</template>

<script>
import { KanbanBoard } from './components';
import axios from 'axios';
import Navbar from './components/NavBar';
import { getItems } from './components/utils'

export default {
	name: "App",
	components: {
    Navbar,
		KanbanBoard
	},
  data() {
    return {
      authorized: this.$cookies.get('jwt_token'),
      user: this.$cookies.get('user'),
      googleSignInParams: {
        client_id: '866078611497-14c6olebgvqskf15ml8tjpn5nbit1sas.apps.googleusercontent.com'
      },
    };
  },
  methods: {
    onGoogleSignInSuccess (resp) {
      const token = resp.uc.access_token
      this.authorized = true;

      axios.post('http://localhost:8000/auth/google/', {
        access_token: token
      })
        .then(resp => {
          this.$cookies.set('jwt_token', resp.data.token);
          getItems(resp.data.token);
          setTimeout(() => {
            this.$cookies.set('user', resp.data.user);
            this.user = resp.data.user;
          }, 2000);
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    onGoogleSignInError (error) {
      console.log('OH NOES', error)
    },
  },
};
</script>

<style src="../style.css"/>

