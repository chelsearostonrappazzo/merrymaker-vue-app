<template>
  <div class="cabal-show">
    <div class="container">
      <h2>{{ cabal.name }}</h2>
      <ol>
        <li v-for="member in cabal.members" v-bind:key="member.id">{{ member.first_name }}</li>
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
