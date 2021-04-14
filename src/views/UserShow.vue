<template>
  <div class="user-show">
    <div class="container">
      <img v-bind:src="user.image" alt="user.full_name" />
      <h1>{{ user.full_name }}</h1>
      <h2>Information</h2>
      <h3>Cabals</h3>
      <div v-for="cabal in user.cabals" v-bind:key="cabal.id">
        <p>{{ cabal.name }}</p>
        <router-link v-bind:to="`/cabals/${cabal.id}`">See Members</router-link>
      </div>
      <h3>Celebrations</h3>
      <div v-for="celebration in user.celebrations" v-bind:key="celebration.id">
        <h4>{{ celebration.name }}</h4>
        <p>Theme: {{ celebration.theme }}</p>
        <p>Occasion: {{ celebration.occasion }}</p>
        <router-link v-bind:to="`/celebrations/${celebration.id}`">See All Info</router-link>
      </div>

      <!-- <p>Colors: {{ celebration.colors }}</p>
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
    // showCelebration: function (celebration) {
    //   console.log(celebration.response);
    //   this.currentCelebration = celebration;
    //   document.querySelector("#celebration-details").showModal();
    // },
  },
};
</script>
