<template>
  <div class="user-show">
    <div class="container">
      <img v-bind:src="user.image" alt="user.full_name" />
      <h1>{{ user.full_name }}</h1>
      <h2>Information</h2>
      <h3>Cabals</h3>
      <p v-for="cabal in user.cabals" v-bind:key="cabal.id">{{ cabal.name }}</p>
      <h3>Celebrations</h3>
      <div v-for="celebration in user.celebrations" v-bind:key="celebration.id">
        <h4>{{ celebration.name }}</h4>
        <button v-on:click="showCelebration(celebration)">More Info</button>
      </div>
      <dialog id="celebration-details">
        <form method="dialog">
          <h1>{{ currentCelebration.name }}</h1>
          <p>Theme: {{ currentCelebration.theme }}</p>
          <p>Occasion: {{ currentCelebration.occasion }}</p>
          <p>Colors: {{ currentCelebration.colors }}</p>
          <!-- <p>Signature Drink: {{ currentCelebration.signature_drink }}</p> -->
          <p>Location: {{ currentCelebration.location }}</p>
          <!-- <p>Cabal: {{ currentCelebration.cabal }}</p>
          <p>Members: {{ currentCelebration.users }}</p> -->
          <!-- <router-link v-bind:to="`/celebrations/${currenCelebration.id}`">See Full Information</router-link> -->
          <button>Close</button>
        </form>
      </dialog>
      <!-- <p>Theme: {{ celebration.theme }}</p>
        <p>Occasion: {{ celebration.occasion }}</p>
        <p>Colors: {{ celebration.colors }}</p>
        <p>Signature Drink: {{ celebration.signature_drink }}</p>
        <p>Location: {{ celebration.location }}</p>
        <p>Cabal: {{ celebration.cabal }}</p>
        <p>Members: {{ celebration.users }}</p> -->
    </div>
  </div>
</template>

<style>
img {
  height: 250px;
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
      celebrations: [],
      currentCelebration: {},
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
    showCelebration: function (celebration) {
      console.log(celebration.response);
      this.currentCelebration = celebration;
      document.querySelector("#celebration-details").showModal();
    },
  },
};
</script>
