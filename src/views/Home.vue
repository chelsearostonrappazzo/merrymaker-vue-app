<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <router-link v-bind:to="`/users/${user.id}`"></router-link>
  </div>
</template>

<style></style>

<script>
export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
    };
  },
  created: function () {},
  methods: {},
};
</script>
