<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h2>Because who even LIKES surprises?</h2>
  </div>
</template>

<style></style>

<script>
export default {
  data: function () {
    return {
      message: "MerryMaker",
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
