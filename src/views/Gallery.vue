<template>
  <div id="photos-gallery">
    <div v-for="photo in photos" :key="photo.id"><img :src="photo.url" /></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      photos: [],
    };
  },
  mounted: function () {
    this.getPhotos();
  },
  methods: {
    getPhotos: function () {
      axios.get("/api/moodboards").then((response) => {
        this.photos = response.data;
      });
    },
  },
};
</script>
