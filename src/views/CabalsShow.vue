<template>
  <div class="container cabal-show">
    <h1>{{ cabal.name }}</h1>
    <ol>
      <li v-for="member in cabal.members" v-bind:key="member.id">{{ member.first_name }} {{ member.last_name }}</li>
    </ol>
    <h4>Add a merrymaker</h4>
    <button v-on:click="showInvitationToken()" class="genric-btn primary-border radius">Invite Code</button>
    <dialog id="invitation-token">
      <form method="dialog">
        <h4>{{ cabal.invitation_token }}</h4>
        <button
          type="button"
          v-clipboard:copy="cabal.invitation_token"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          class="genric-btn primary-border radius"
        >
          Copy
        </button>
        <button class="genric-btn primary-border radius">Close</button>
      </form>
    </dialog>
    <!-- <h4>Leave Group?</h4>
      <button v-on:click="destroyMembers(member)">Leave Cabal</button> -->
    <h2>Celebrations</h2>
    <div v-for="celebration in cabal.celebrations" v-bind:key="celebration.id">
      <h4>{{ celebration.name }}</h4>
      <p>Theme: {{ celebration.theme }}</p>
      <p>Occasion: {{ celebration.occasion }}</p>
      <router-link v-bind:to="`/celebrations/${celebration.id}`" tag="button" class="genric-btn primary-border radius">
        See All Info
      </router-link>
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
      // members: [],
    };
  },
  mounted: function () {
    this.showCabals();
    this.indexMembers();
  },
  methods: {
    showCabals: function () {
      axios.get("/api/cabals/" + this.$route.params.id).then((response) => {
        console.log(response.data);
        this.cabal = response.data;
      });
    },
    indexMembers: function () {
      axios.get("/api/members/").then((response) => {
        console.log(response.data);
        this.members = response.data;
      });
    },
    showInvitationToken: function () {
      document.querySelector("#invitation-token").showModal();
    },
    onCopy: function (e) {
      alert("You just copied: " + e.text);
    },
    onError: function (e) {
      alert("Failed to copy texts");
      console.log(e);
    },
    // destroyMembers: function (member) {
    //   axios.delete("/api/members/" + member.id).then(() => {
    //     console.log("I'm Leabing the Group");
    //     let index = this.members.indexOf(member);
    //     this.members.splice(index, 1);
    //     this.$router.push("/profile");
    //   });
    // },
  },
};
</script>
