<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">

      <b-navbar-brand href="/">Kanban Board</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item style="font-size: 1.1rem;" class="mr-2">Username: {{ user.username }}</b-nav-item>
          <b-button type="submit" v-on:click="logOut">Log out</b-button>
        </b-navbar-nav>
      </b-collapse>

    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: ['user'],
  methods: {
    logOut() {
      this.$cookies.remove('jwt_token');
      this.$cookies.remove('refresh_token');
      this.$cookies.remove('user');
      localStorage.removeItem('items0');
      localStorage.removeItem('items1');
      localStorage.removeItem('items2');
      localStorage.removeItem('items3');
      location.reload();
    }
  }
}
</script>

<style scoped>

</style>
