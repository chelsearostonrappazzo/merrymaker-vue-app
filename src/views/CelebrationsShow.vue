<template>
  <div class="celebrations-show">
    <div class="container">
      <h1>Celebrations</h1>
      <h2>{{ celebration.name }}</h2>
      <h3>Celebrant: {{ celebration.celebrant }}</h3>
      <p>
        <strong>Status: {{ celebration.status }}</strong>
      </p>
      <p>Theme: {{ celebration.theme }}</p>
      <p>Occasion: {{ celebration.occasion }}</p>
      <p>Location: {{ celebration.location }}</p>
      <p>Colors: {{ celebration.colors }}</p>
      <p>Signature Drink: {{ celebration.signature_drink }}</p>
      <p>Cabal: {{ celebration.cabal }}</p>
      <p>Notes: {{ celebration.notes }}</p>
      <p v-for="moodboard in celebration.moodboard" :key="moodboard.id"><img :src="moodboard.photo" /></p>
      <div v-if="isCelebrant()" class="celebrant-buttons">
        <router-link v-bind:to="`/celebrations/${celebration.id}/edit`" tag="button">Edit</router-link>
        <button v-on:click="destroyCelebration(celebration)">Completed?</button>
        <router-link to="/moodboard" tag="button">Create a Moodboard</router-link>
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
    this.showMoodboard();
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
      return userId == this.celebration.user_id;
    },
    destroyCelebration: function (celebration) {
      axios.delete("/api/celebrations/" + celebration.id).then(() => {
        console.log("Event is completed!");
        this.$router.push("/celebrations");
      });
    },
    showMoodboard: function () {
      axios.get("/api/moodboards").then(() => {
        console.log("The Aesthetic");
      });
    },
  },
};
</script>
