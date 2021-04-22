<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div v-if="isLoggedIn()">
      <h2>Cabals</h2>
      <form v-on:submit.prevent="createCabal()">
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" v-model="name" />
        </div>
        <input type="submit" class="btn btn-primary" value="Create" />
      </form>
    </div>
    <h2>Join a Cabal!</h2>
    <form v-on:submit.prevent="joinCabal()">
      <div class="form-group">
        <label>Invitation Code</label>
        <input type="text" class="form-control" v-model="invitation_token" />
      </div>
      <input type="submit" class="btn btn-primary" value="Join" />
    </form>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "Un-Zilla",
      name: "",
      errors: [],
    };
  },
  created: function () {},
  methods: {
    createCabal: function () {
      let params = { name: this.name };
      axios
        .post("/api/cabals", params)
        .then(() => {
          this.$router.push("/profile");
        })
        .catch((errors) => console.log(errors.response));
    },
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
      // if (localStorage.getItem("jwt")) {
      // return true;
      // } else {
      // return false;
      // }
    },
    joinCabal: function () {
      let params = {
        invitation_token: this.invitation_token,
      };
      axios
        .post("/api/members", params)
        .then(() => this.$router.push("/profile"))
        .catch((errors) => console.log(errors.response));
    },
  },
};
</script>
