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
      <div class="default-select" id="default-select">
        <select v-model="status">
          <option value="Planning">Planning</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div v-for="celebration in filterCelebrationsByStatus" v-bind:key="celebration.id">
        <router-link v-bind:to="`celebrations/${celebration.id}`">
          <h2>{{ celebration.name }}</h2>
        </router-link>
        <p>Celebrant: {{ celebration.celebrant }}</p>
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
    };
  },
  mounted: function () {
    this.indexCelebrations();
  },
  computed: {
    filterCelebrationsByStatus: function () {
      return this.celebrations.filter((celebration) => !celebration.status.indexOf(this.status));
    },
  },
  methods: {
    indexCelebrations: function () {
      axios.get("/api/celebrations").then((response) => {
        this.celebrations = response.data;
        console.log(this.celebrations);
      });
    },
  },
};
</script>
