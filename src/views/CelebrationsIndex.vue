<template>
  <div class="celebrations-index">
    <section class="slider-area slider-area2 slider-height2 d-flex align-items-center hero-overly">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-11 col-md-12">
            <div class="hero__caption hero__caption2 text-center">
              <h2>Let's Celebrate!</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="container section-top-border">
      <div class="row">
        <div class="col-lg-8">
          <span class="span-spacing">
            <select v-model="status">
              <option disabled value="">Filter by Status</option>
              <option value="Planning">Planning</option>
              <option value="Completed">Completed</option>
            </select>
          </span>
          <span class="span-spacing">
            <input type="text" v-model="occasion" placeholder="Filter By Occasion" />
          </span>
        </div>
        <div class="section-top-border">
          <div class="row">
            <div v-for="celebration in filteredCelebrations" v-bind:key="celebration.id" class="col-md-4">
              <div class="single-defination">
                <router-link v-bind:to="`celebrations/${celebration.id}`">
                  <h2 class="mb-20">{{ celebration.name }}</h2>
                </router-link>
                <div>
                  <p class="zero-margin">celebrant</p>
                  <p class="celeb-info">{{ celebration.celebrant }}</p>

                  <p class="zero-margin">occasion</p>
                  <p class="celeb-info">{{ celebration.occasion }}</p>
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
      celebrations: [],
      status: "",
      occasion: "",
    };
  },
  created: function () {
    this.indexCelebrations();
  },
  computed: {
    filteredCelebrations: function () {
      return this.filterCelebrationsByOccasion(this.filterCelebrationsByStatus(this.celebrations));
    },
  },
  methods: {
    indexCelebrations: function () {
      axios.get("/api/celebrations").then((response) => {
        this.celebrations = response.data;
        console.log(this.celebrations);
      });
    },
    filterCelebrationsByStatus: function (celebrations) {
      return celebrations.filter((celebration) => !celebration.status.indexOf(this.status));
    },
    filterCelebrationsByOccasion: function (celebrations) {
      return celebrations.filter((celebration) => !celebration.occasion.indexOf(this.occasion));
    },
  },
};
</script>
