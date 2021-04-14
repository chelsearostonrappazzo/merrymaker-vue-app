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
      <p>Members: <ol><li v-for="member in celebration.members" v-bind:key="member.id"> {{ member.first_name }}</li></ol></p>
      <p>Notes: {{ celebration.notes }}</p>
      <div class="celebrant-buttons" >
        <router-link v-if="isCelebrant()" v-bind:to="`/celebrations/${celebration.id}/edit`">Edit</router-link>
      </div>
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
    isCelebrant: function () {
      let userId = localStorage.getItem("user_id");
      console.log(userId);
      console.log(this.celebration.user_id);
      return userId == this.celebration.user_id;
    },
  },
};
</script>
