<template>
  <div class="user-show">
    <div class="container">
      <img v-bind:src="user.image" alt="user.full_name" />
      <h1>{{ user.full_name }}</h1>
    </div>
  </div>
</template>

<style>
img {
  height: 500px;
  width: auto;
}
</style>
<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
      errors: [],
    };
  },
  mounted: function () {
    this.showUser();
  },
  methods: {
    showUser: function () {
      axios.get("api/users/" + this.$route.params.id).then((response) => {
        console.log(response.data);
        this.user = response.data;
      });
    },
  },
};
</script>
