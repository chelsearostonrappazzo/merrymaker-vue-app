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
    <div class="whole-wrap">
      <div class="container" v-for="celebration in celebrations" :key="celebration.id">
        <div class="section-top-border">
          <div class="row justify-content-center">
            <div class="col-lg-10">
              <div class="section-tittle mb-60 text-center">
                <h2>{{ celebration.theme }}</h2>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="moodboard-gallery">
              <div class="moodboard-gallery-panel" v-for="photo in celebration.photos" :key="photo.id">
                <img :src="photo.photo" class="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.moodboard-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 1rem;
  max-width: 500rem;
  margin: 5rem auto;
  padding: 0 5rem;
}
.moodboard-gallery-panel img {
  width: 100%;
  height: 15vw;
  object-fit: cover;
  border-radius: 0.75rem;
}
</style>
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
    onSelectImage: function (data) {
      console.log("fire event onSelectImage:  ", data);
      this.imageSelected = data;
      document.querySelector("#delete-moodboard-modal").showModal();
    },
    onUnselectSingleImage: function () {
      this.$refs["single-select-image"].removeFromSingleSelected();
    },
  },
};
</script>
