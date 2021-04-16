<template>
  <div class="celebrations-new">
    <ul>
      <li class="text-danger" v-for="error in errors" v-bind:key="error">
        {{ error }}
      </li>
    </ul>
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
        <label>Cabal</label>
        <select @change="pickCabal($event)" class="form-control" v-model="selectedCabal">
          <option>Select Cabal</option>
          <option v-for="cabal in cabals" :value="cabal.id" :key="cabal.id">{{ cabal.name }}</option>
        </select>
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
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      selectedCabal: {},
      name: "",
      occasion: "",
      theme: "",
      colors: "",
      signature_drink: "",
      location: "",
      notes: "",
      activity: "",
      errors: [],
      cabals: [],
    };
  },
  created: function () {
    this.indexCabals();
  },
  methods: {
    createCelebration: function () {
      let params = {
        name: this.name,
        occasion: this.occasion,
        cabal_id: this.selectedCabal.id,
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
    indexCabals: function () {
      axios.get("/api/cabals").then((response) => {
        this.cabals = response.data;
      });
    },
    pickCabal: function (event) {
      console.log(event.target.value);
    },
  },
};
</script>
