<template>
  <div class="cabals-index">
    <section class="slider-area slider-area2 slider-height2 d-flex align-items-center hero-overly">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-11 col-md-12">
            <div class="hero__caption hero__caption2 text-center">
              <h2>Ca-ballin'</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="section-top-border">
      <div v-for="cabal in cabals" v-bind:key="cabal.id">
        <router-link v-bind:to="`cabals/${cabal.id}`">
          <h2>{{ cabal.name }}</h2>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      cabals: [],
      status: "",
    };
  },
  mounted: function () {
    this.indexcabals();
  },
  methods: {
    indexcabals: function () {
      axios.get("/api/cabals").then((response) => {
        this.cabals = response.data;
        console.log(this.cabals);
      });
    },
  },
};
</script>
