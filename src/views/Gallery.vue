<template>
  <div id="photos-gallery">
    <section class="slider-area slider-area2 slider-height2 d-flex align-items-center hero-overly">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-11 col-md-12">
            <div class="hero__caption hero__caption2 text-center">
              <h2>Gallery</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div v-for="celebration in celebrations" :key="celebration.id">
      {{ celebration.theme }}
      <span v-for="photo in celebration.photos" :key="photo.id">
        <img :src="photo.photo" />
      </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      celebrations: [],
    };
  },
  mounted: function () {
    this.getMoodboards();
  },
  methods: {
    getMoodboards: function () {
      axios.get("/api/celebrations").then((response) => {
        this.celebrations = response.data;
        console.log(this.celebrations);
      });
    },
  },
};
</script>
