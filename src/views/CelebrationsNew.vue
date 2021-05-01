<template>
  <div class="celebrations-new">
    <ul>
      <li class="text-danger" v-for="error in errors" v-bind:key="error">
        {{ error }}
      </li>
    </ul>
    <section class="slider-area slider-area2 slider-height2 d-flex align-items-center hero-overly">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-11 col-md-12">
            <div class="hero__caption hero__caption2 text-center">
              <h2>What's Your Poison?</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="container section-top-border">
      <h3 class="mb-30">Create a Celebration</h3>

      <form v-on:submit.prevent="createCelebration()">
        <div class="col-lg-8 col-md-8">
          <div class="mt-10">
            <input
              type="text"
              placeholder="Name"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Name'"
              required
              class="single-input"
              v-model="name"
            />
          </div>
          <div class="mt-10">
            <input
              type="text"
              placeholder="Occasion"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Occasion'"
              required
              class="single-input"
              v-model="occasion"
            />
          </div>
          <div class="mt-10">
            <select class="form-control" v-model="selectedCabal">
              <option>Select Cabal</option>
              <option v-for="cabal in cabals" :value="cabal.id" :key="cabal.id">{{ cabal.name }}</option>
            </select>
          </div>
          <div class="mt-10">
            <input
              type="text"
              placeholder="Theme"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Theme'"
              required
              class="single-input"
              v-model="theme"
            />
          </div>

          <div class="mt-10">
            <input
              type="text"
              placeholder="Colors"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Colors'"
              required
              class="single-input"
              v-model="colors"
            />
          </div>
          <div class="mt-10">
            <input
              type="text"
              placeholder="Location"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Location'"
              required
              class="single-input"
              v-model="location"
            />
          </div>
          <div class="mt-10">
            <input
              type="text"
              placeholder="Activity"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Activity'"
              required
              class="single-input"
              v-model="activity"
            />
          </div>
          <div class="mt-10">
            <input
              type="text"
              placeholder="Signature Drink"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Signature Drink'"
              required
              class="single-input"
              v-model="signature_drink"
            />
          </div>
          
        </div>

        <input type="submit" class="genric-btn primary-border radius" value="Submit" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      selectedCabal: "",
      name: "",
      occasion: "",
      theme: "",
      colors: "",
      signature_drink: "",
      location: "",
    
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
        cabal_id: this.selectedCabal,
        theme: this.theme,
        colors: this.colors,
        signature_drink: this.signature_drink,
        location: this.location,
   
        activity: this.activity,
      };
      axios
        .post("/api/celebrations", params)
        .then(() => {
          console.log("Creating an Event!");
          this.$router.push("/celebrations");
        })
        .catch((errors) => console.log(errors.response));
    },
    indexCabals: function () {
      axios.get("/api/cabals").then((response) => {
        this.cabals = response.data;
      });
    },
    // pickCabal: function (event) {
    //   console.log(event.target.value);
    // },
  },
};
</script>
