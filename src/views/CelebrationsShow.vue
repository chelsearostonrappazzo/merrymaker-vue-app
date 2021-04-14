<template>
  <div class="celebrations-show">
    <div class="container">
      <h1>Celebrations</h1>
      <h2>{{ celebration.name }}</h2>
      <h3>Celebrant: {{ celebration.celebrant }}</h3>
      <p>Theme: {{ celebration.theme }}</p>
      <p>Occasion: {{ celebration.occasion }}</p>
      <p>Location: {{ celebration.location }}</p>
      <p>Colors: {{ celebration.colors }}</p>
      <p>Signature Drink: {{ celebration.signature_drink }}</p>
      <p>Cabal: {{ celebration.cabal }}</p>
      <p>Members: {{ celebration.users }}</p>
      <p>Notes: {{ celebration.notes }}</p>
      <router-link v-bind:to="`/celebrations/${celebration.id}/edit`">Edit</router-link>
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
