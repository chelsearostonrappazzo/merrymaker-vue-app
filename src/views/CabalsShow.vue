<template>
  <div class="cabal-show">
    <div class="container">
      <h2>{{ cabal.name }}</h2>
      <ol>
        <li v-for="user in cabal.users" v-bind:key="user.id">{{ user.first_name }}</li>
      </ol>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      errors: [],
      cabal: {},
    };
  },
  mounted: function () {
    this.showCabals();
  },
  methods: {
    showCabals: function () {
      axios.get("/api/cabals/" + this.$route.params.id).then((response) => {
        console.log(response.data);
        this.cabal = response.data;
      });
    },
  },
};
</script>
