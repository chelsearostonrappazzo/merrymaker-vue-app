<template>
  <div class="celebrations-edit">
    <form v-on:submit.prevent="updateCelebration(celebration)">
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" v-model="celebration.name" />
      </div>
      <div class="form-group">
        <label>Occasion</label>
        <input type="text" class="form-control" v-model="celebration.occasion" />
      </div>
      <div class="form-group">
        <label>Theme</label>
        <input type="text" class="form-control" v-model="celebration.theme" />
      </div>
      <div class="form-group">
        <label>Location</label>
        <input type="text" class="form-control" v-model="celebration.location" />
      </div>
      <div class="form-group">
        <label>Colors</label>
        <input type="text" class="form-control" v-model="celebration.colors" />
      </div>
      <div class="form-group">
        <label>Activity</label>
        <input type="text" class="form-control" v-model="celebration.activity" />
      </div>
      <div class="form-group">
        <label>Signature Drink</label>
        <input type="text" class="form-control" v-model="celebration.signature_drink" />
      </div>
      <div class="form-group">
        <textarea class="form-control" v-model="celebration.notes" placeholder="Write additional Notes here" />
      </div>
      <input type="submit" class="btn btn-primary" value="Update" />
    </form>
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
  created: function () {
    axios.get("api/celebrations/" + this.$route.params.id).then((response) => {
      console.log(response.data);
      this.celebration = response.data;
    });
  },
  methods: {
    updateCelebration: function (celebration) {
      let params = {
        name: celebration.name,
        occasion: celebration.occasion,
        theme: celebration.theme,
        colors: celebration.colors,
        location: celebration.location,
        activity: celebration.activity,
        signature_drink: celebration.signature_drink,
        notes: celebration.notes,
        cabal: celebration.cabal,
      };
      axios
        .patch("/api/celebrations/" + this.$route.params.id, params)
        .then(() => {
          this.$router.push("/celebrations/" + this.celebration.id);
        })
        .catch((error) => console.log(error.response));
    },
  },
};
</script>
