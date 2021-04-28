<template>
  <div class="celebrations-show">
    <section class="slider-area slider-area2 slider-height2 d-flex align-items-center hero-overly">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-11 col-md-12">
            <div class="hero__caption hero__caption2 text-center">
              <h2>{{ celebration.name }}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="whole-wrap">
      <div class="container box_1170">
        <div class="section-top-border text-left">
          <div class="row">
            <div class="col-md-9 mt-sm-20">
              <h2>Celebrant: {{ celebration.celebrant }}</h2>
              <p>
                <strong>Status: {{ celebration.status }}</strong>
              </p>
              <p>Theme: {{ celebration.theme }}</p>
              <p>Occasion: {{ celebration.occasion }}</p>
              <p>Location: {{ celebration.location }}</p>
              <p>Colors: {{ celebration.colors }}</p>
              <p>Signature Drink: {{ celebration.signature_drink }}</p>
              <p>Cabal: {{ celebration.cabal }}</p>
              <p>Notes: {{ celebration.notes }}</p>
              <div v-if="isCelebrant()" class="celebrant-buttons">
                <router-link
                  v-bind:to="`/celebrations/${celebration.id}/edit`"
                  tag="button"
                  class="genric-btn primary-border radius"
                >
                  Edit
                </router-link>
                <button class="genric-btn primary-border radius" v-on:click="destroyCelebration(celebration)">
                  Completed?
                </button>
                <router-link to="/moodboard" tag="button" class="genric-btn primary-border radius">
                  Moodboard
                </router-link>
              </div>
              <h3>The Aesthetic</h3>
              <div class="row gallery-item">
                <div v-for="moodboard in celebration.moodboard" :key="moodboard.id" class="col-md-4">
                  <div class="single-gallery-image">
                    <img :src="moodboard.photo" class="img-pop-up" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style></style>
<script>
import axios from "axios";
export default {
  data: function () {
    return {
      errors: [],
      celebration: {},
    };
  },
  mounted: function () {
    this.showCelebrations();
    this.showMoodboard();
  },
  methods: {
    showCelebrations: function () {
      axios.get("/api/celebrations/" + this.$route.params.id).then((response) => {
        console.log(response.data);
        this.celebration = response.data;
      });
    },
    isCelebrant: function () {
      let userId = localStorage.getItem("user_id");
      return userId == this.celebration.user_id;
    },
    destroyCelebration: function (celebration) {
      axios.delete("/api/celebrations/" + celebration.id).then(() => {
        console.log("Event is completed!");
        this.$router.push("/celebrations");
      });
    },
    showMoodboard: function () {
      axios.get("/api/moodboards").then(() => {
        console.log("The Aesthetic");
      });
    },
  },
};
</script>
-->
