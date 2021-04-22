<template>
  <div class="cabal-show">
    <div class="container">
      <h1>{{ cabal.name }}</h1>
      <ol>
        <li v-for="member in cabal.members" v-bind:key="member.id">{{ member.first_name }} {{ member.last_name }}</li>
      </ol>
      <h4>Add a merrymaker</h4>
      <button v-on:click="showInvitationToken()">Invite Code</button>
      <dialog id="invitation-token">
        <form method="dialog">
          <h4>{{ cabal.invitation_token }}</h4>
          <button>Close</button>
        </form>
      </dialog>
    </div>

    <h2>Celebrations</h2>
    <div v-for="celebration in cabal.celebrations" v-bind:key="celebration.id">
      <h4>{{ celebration.name }}</h4>
      <p>Theme: {{ celebration.theme }}</p>
      <p>Occasion: {{ celebration.occasion }}</p>
      <router-link v-bind:to="`/celebrations/${celebration.id}`">See All Info</router-link>
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
    showInvitationToken: function () {
      document.querySelector("#invitation-token").showModal();
    },
  },
};
</script>
