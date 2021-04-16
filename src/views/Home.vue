<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h2>Cabals</h2>
    <form v-on:submit.prevent="createCabal()">
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" v-model="name" />
      </div>
      <input type="submit" class="btn btn-primary" value="Create" />
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
        .then((response) => {
          console.log(this.cabals);
          this.cabals.push(response.data);
        })
        .catch((errors) => console.log(errors.response));
    },
  },
};
</script>
