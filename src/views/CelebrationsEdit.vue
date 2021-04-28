<template>
  <div class="celebrations-edit">
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
    <div class="container section-top-border">
      <h3 class="mb-30">Changed Your Mind?</h3>
      <form v-on:submit.prevent="updateCelebration(celebration)">
        <div class="col-lg-8 col-md-8">
          <div class="mt-10">
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
          <div class="mt-10">
            <textarea
              class="form-control w-100"
              v-model="celebration.notes"
              cols="30"
              rows="9"
              placeholder="What else is there to say?"
            ></textarea>
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
