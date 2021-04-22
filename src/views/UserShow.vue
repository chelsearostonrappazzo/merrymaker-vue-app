<template>
  <div class="user-show">
    <div class="container">
      <img v-bind:src="user.image" alt="user.full_name" />
      <h1>{{ user.full_name }}</h1>
      <p>Email: {{ user.email }}</p>
      <router-link v-bind:to="`/profile/edit`">Edit Profile</router-link>
      <h2>Dashboard</h2>
      <h4>Create a Cabal!</h4>
      <form v-on:submit.prevent="createCabal()">
        <div class="form-group">
          <label>Name</label>
          <input type="text" class="form-control" v-model="name" />
        </div>
        <input type="submit" class="btn btn-primary" value="Create" />
      </form>
    </div>
    <h4>Join a Cabal!</h4>
    <form v-on:submit.prevent="joinCabal()">
      <div class="form-group">
        <label>Invitation Code</label>
        <input type="text" class="form-control" v-model="invitation_token" />
      </div>
      <input type="submit" class="btn btn-primary" value="Join" />
    </form>
    <h4>Ready to Start Planning?</h4>
    <router-link to="/celebrations/new">Add Celebration</router-link>
    <h2>Information</h2>
    <h3>Cabals</h3>
    <div v-for="cabal in user.cabals" v-bind:key="cabal.id">
      <p>{{ cabal.name }}</p>
      <router-link v-bind:to="`/cabals/${cabal.id}`">See More Details</router-link>
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
      name: "",
      invitation_token: "",
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
    joinCabal: function () {
      let params = {
        invitation_token: this.invitation_token,
      };
      axios
        .post("/api/members", params)
        .then(() => this.$router.push("/profile"))
        .catch((errors) => console.log(errors.response));
    },
    createCabal: function () {
      let params = { name: this.name };
      axios
        .post("/api/cabals", params)
        .then(() => {
          this.$router.push("/profile");
        })
        .catch((errors) => console.log(errors.response));
    },
  },
};
</script>
