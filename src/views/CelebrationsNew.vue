<template>
  <div class="celebrations-new">
    <form v-on:submit.prevent="createCelebration()">
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="form-control" v-model="name" />
      </div>
      <div class="form-group">
        <label>Occasion</label>
        <input type="text" class="form-control" v-model="occasion" />
      </div>
      <div class="form-group">
        <label>Theme</label>
        <input type="text" class="form-control" v-model="theme" />
      </div>
      <div class="form-group">
        <label>Colors</label>
        <input type="text" class="form-control" v-model="colors" />
      </div>
      <div class="form-group">
        <label>Location</label>
        <input type="text" class="form-control" v-model="location" />
      </div>
      <div class="form-group">
        <label>Activity</label>
        <input type="text" class="form-control" v-model="activity" />
      </div>
      <div class="form-group">
        <label>Signature Drink</label>
        <input type="text" class="form-control" v-model="signature_drink" />
      </div>
      <div class="form-group">
        <textarea class="form-control" v-model="notes" placeholder="Write additional Notes here" />
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
      name: "",
      occasion: "",
      theme: "",
      colors: "",
      signature_drink: "",
      location: "",
      notes: "",
      activity: "",
      errors: [],
    };
  },
  methods: {
    createCelebration: function () {
      let params = {
        name: this.name,
        occasion: this.occasion,
        theme: this.theme,
        colors: this.colors,
        signature_drink: this.signature_drink,
        location: this.location,
        notes: this.notes,
        activity: this.activity,
      };
      axios
        .post("/api/celebrations", params)
        .then((response) => {
          console.log(this.celebrations);
          this.celebrations.push(response.data);
          this.name = "";
          this.occasion = "";
          this.theme = "";
          this.colors = "";
          this.signature_drink = "";
          this.location = "";
          this.notes = "";
          this.activity = "";
        })
        .catch((errors) => console.log(errors.response));
    },
  },
};
</script>
