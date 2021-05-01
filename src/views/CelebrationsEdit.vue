<template>
  <div class="celebrations-edit">
    <div v-if="isCelebrant()">
      <section class="slider-area slider-area2 slider-height2 d-flex align-items-center hero-overly">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xl-8 col-lg-11 col-md-12">
              <div class="hero__caption hero__caption2 text-center">
                <h2>For Celebrant Eyes Only</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="container section-top-border">
        <h3 class="mb-30">Changed Your Mind?</h3>
        <form v-on:submit.prevent="updateCelebration(celebration)">
          <div class="col-lg-8 col-md-8">
            <div class="mt-10">
              <p>Name</p>
              <input
                type="text"
                placeholder="Name"
                onfocus="this.placeholder = ''"
                onblur="this.placeholder = 'Name'"
                required
                class="single-input"
                v-model="celebration.name"
              />
            </div>
            <div class="mt-10">
              <p>Occasion</p>
              <input
                type="text"
                placeholder="Occasion"
                onfocus="this.placeholder = ''"
                onblur="this.placeholder = 'Occasion'"
                required
                class="single-input"
                v-model="celebration.occasion"
              />
            </div>
            <div class="mt-10">
              <p>Theme</p>
              <input
                type="text"
                placeholder="Theme"
                onfocus="this.placeholder = ''"
                onblur="this.placeholder = 'Theme'"
                required
                class="single-input"
                v-model="celebration.theme"
              />
            </div>
            <div class="mt-10">
              <p>Colors</p>
              <input
                type="text"
                placeholder="Colors"
                onfocus="this.placeholder = ''"
                onblur="this.placeholder = 'Colors'"
                required
                class="single-input"
                v-model="celebration.colors"
              />
            </div>
            <div class="mt-10">
              <p>Location</p>
              <input
                type="text"
                placeholder="Location"
                onfocus="this.placeholder = ''"
                onblur="this.placeholder = 'Location'"
                required
                class="single-input"
                v-model="celebration.location"
              />
            </div>
            <div class="mt-10">
              <p>Activity</p>
              <input
                type="text"
                placeholder="Activity"
                onfocus="this.placeholder = ''"
                onblur="this.placeholder = 'Activity'"
                required
                class="single-input"
                v-model="celebration.activity"
              />
            </div>
            <div class="mt-10">
              <p>Signature Drink</p>
              <input
                type="text"
                placeholder="Signature Drink"
                onfocus="this.placeholder = ''"
                onblur="this.placeholder = 'Signature Drink'"
                required
                class="single-input"
                v-model="celebration.signature_drink"
              />
            </div>
          </div>

          <input type="submit" class="genric-btn primary-border radius" value="Submit" />
        </form>
      </div>
    </div>
    <div v-else>
      <div class="slider-area">
        <div class="slider-item">
          <div class="slider-bg3 slider-height hero-overly slider-bg1 d-flex align-items-center">
            <div class="container">
              <div class="row">
                <div class="col-xl-9 col-lg-10">
                  <div class="slide-content">
                    <h1>403.</h1>
                    <h2 class="not-found">This isn't about you!</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="slider-caption2">
          <div class="container">
            <div class="row">
              <div class="col-xl-4 col-lg-4 col-md-7 col-sm-8">
                <div class="slide-content2">
                  <h4>Only the Celebrant can update an event!</h4>
                  <p>Try one of these!</p>
                  <p>
                    <router-link to="/" tag="button" class="genric-btn primary-border radius">Home</router-link>
                    <router-link to="/profile" tag="button" class="genric-btn primary-border radius">
                      Profile
                    </router-link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
        cabal: celebration.cabal,
      };
      axios
        .patch("/api/celebrations/" + this.$route.params.id, params)
        .then(() => {
          this.$router.push("/celebrations/" + this.celebration.id);
        })
        .catch((errors) => console.log(errors.response));
    },
    isCelebrant: function () {
      let userId = localStorage.getItem("user_id");
      return userId == this.celebration.user_id;
    },
  },
};
</script>
