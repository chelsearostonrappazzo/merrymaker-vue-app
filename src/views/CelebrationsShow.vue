<template>
  <div class="celebration-show">
    <div class="container">
      <h1>Celebrations</h1>
      <h2>{{ celebration.name }}</h2>
      <p>Theme: {{ celebration.theme }}</p>
      <p>Occasion: {{ celebration.occasion }}</p>
      <p>Colors: {{ celebration.colors }}</p>
      <p>Signature Drink: {{ celebration.signature_drink }}</p>
      <p>Location: {{ celebration.location }}</p>
      <p>Cabal: {{ celebration.cabal }}</p>
      <p>Members: {{ celebration.users }}</p>

      <!-- <p v-for="user in celebration.users" v-bind:key="user.id">{{ user.first_name }}</p> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      errors: [],
      celebration: {},
    };
  },
  mounted: function () {
    this.showCelebrations();
  },
  methods: {
    showCelebrations: function () {
      axios.get("/api/celebrations/" + this.$route.params.id).then((response) => {
        console.log(response.data);
        this.celebration = response.data;
      });
    },
  },
};
</script>
