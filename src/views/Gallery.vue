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
                <a
                  v-if="celebration.user_id == userId"
                  class="public-profile"
                  href=""
                  @click.prevent="showEdit = !showEdit"
                >
                  edit
                </a>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="color-palette-gallery">
              <div class="color-palette-panel" v-for="moodboard in moodboards" :key="moodboard.id">
                <img v-if="moodboard.photo.color != null" :style="{ 'background-color': color }" />
              </div>
            </div>
            <div class="moodboard-gallery">
              <div class="moodboard-gallery-panel" v-for="moodboard in moodboards" :key="moodboard.id">
                <img :src="moodboard.photo.photo" class="img-fluid" />
                <input
                  v-show="showEdit"
                  id="default-radio"
                  :key="moodboard.photo.photo"
                  :value="moodboard.photo.photo"
                  type="radio"
                  v-model="selectedPhoto"
                />
              </div>
            </div>
            <a href="" class="public-profile" v-show="showEdit" v-on:click="deleteMoodboard">delete image</a>
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
      moodboards: [],
      celebrationPhotos: [],
      showEdit: false,
      selectedPhoto: "",
      userId: localStorage.getItem("user_id"),
    };
  },
  created: function () {
    this.getCelebrations();
    this.getMoodboards();
    this.getCelebrationPhotos();
  },

  methods: {
    getCelebrations: function () {
      axios.get("/api/celebrations").then((response) => {
        this.celebrations = response.data;
        console.log(this.celebrations);
      });
    },
    getMoodboards: function () {
      axios.get("/api/moodboards").then((response) => {
        this.moodboards = response.data;
        console.log(this.moodboards);
      });
    },
    getCelebrationPhotos: function () {
      axios.get("/api/celebrationphotos").then((response) => {
        this.celebrationPhotos = response.data;
        console.log(this.celebrationPhotos);
      });
    },
    deleteMoodboard: function () {
      axios.delete("/api/moodboards/" + this.selectedPhoto).then(() => {
        console.log("Deleted!");
        this.$router.go(0);
      });
    },
  },
};
</script>
