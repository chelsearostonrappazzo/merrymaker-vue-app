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
      <div class="section-top-border">
        <div class="container" v-for="celebration in celebrations" :key="celebration.id">
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
              <div class="color-palette-panel" v-for="moodboard in celebration.moodboards" :key="moodboard.id">
                <img v-if="moodboard.photo.color != null" :style="{ 'background-color': moodboard.photo.color }" />
              </div>
            </div>
            <div class="moodboard-gallery">
              <div class="moodboard-gallery-panel" v-for="moodboard in celebration.moodboards" :key="moodboard.id">
                <img :src="moodboard.photo.photo" class="img-fluid" />
                <input
                  v-show="showEdit"
                  id="default-radio"
                  :key="moodboard.photo.id"
                  :value="moodboard.photo.id"
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
      showEdit: false,
      selectedPhoto: "",
      userId: localStorage.getItem("user_id"),
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
    deleteMoodboard: function () {
      axios.delete("/api/moodboards/" + this.selectedPhoto).then(() => {
        console.log("Deleted!");
        this.$router.go(0);
      });
    },
  },
};
</script>
