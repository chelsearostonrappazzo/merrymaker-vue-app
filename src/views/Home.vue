<template>
  <div class="home">
    <h1>{{ message }}</h1>
  </div>
</template>

<style></style>

<script>
export default {
  data: function () {
    return {
      message: "Un-Zilla",
      name: "",
      errors: [],
    };
  },
  created: function () {},
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
      // if (localStorage.getItem("jwt")) {
      // return true;
      // } else {
      // return false;
      // }
    },
  },
};
</script>
