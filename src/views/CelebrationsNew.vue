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
    <div class="container section-top-border text-left">
      <h3 class="mb-30">What's your Poison?</h3>
      <div class="row">
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
                placeholder="Occasion"
                onfocus="this.placeholder = ''"
                onblur="this.placeholder = 'Occasion'"
                required
                class="single-input"
                v-model="occasion"
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
            <div class="mt-10">
              <input />
              <textarea
                class="form-control w-100"
                v-model="notes"
                cols="30"
                rows="9"
                placeholder="What else is there to say?"
              ></textarea>
            </div>
          </div>
          <!-- <form v-on:submit.prevent="createCelebration()">
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
        <select class="form-control" v-model="selectedCabal">
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
      </div> -->
          <input type="submit" class="genric-btn primary-border radius" value="Submit" />
        </form>
      </div>
    </div>
    <!-- <select @change="pickCabal($event)" class="form-control" v-model="selectedCabal">
          <option>Select Cabal</option>
          <option v-for="cabal in cabals" :value="cabal.id" :key="cabal.id">{{ cabal.name }}</option>
        </select> -->
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
        cabal_id: this.selectedCabal,
        theme: this.theme,
        colors: this.colors,
        signature_drink: this.signature_drink,
        location: this.location,
        notes: this.notes,
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
