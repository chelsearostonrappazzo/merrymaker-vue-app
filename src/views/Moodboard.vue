<template>
  <div class="moodboard">
    <h1>Moodboard</h1>
    <input type="text" placeholder="it's the aesthetic for me" v-model="searchPhoto" />
    <button type="submit" v-on:click="searchPhotos(searchPhoto)">Search</button>
    <div v-for="photo in photoList" :key="photo.id">
      <p>
        <img
          v-bind:src="photo.url"
          @click="selectfromSearch(photo.url)"
          :class="{ selected: selectedPhoto == photo.url }"
        />
        <button v-on:click="addToMoodboardModal(selectedPhoto)">Add to Mooboard</button>
      </p>
    </div>
    <dialog id="add-moodboard-modal">
      <form method="dialog">
        {{ selectedPhoto }}
        <button v-on:click="addToMoodboard(selectedPhoto)">Add</button>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>
<style>
img.selected {
  border: solid 5px mistyrose;
}
</style>
<script>
import axios from "axios";
// import "vue-search-select/dist/VueSearchSelect.css";

export default {
  data: function () {
    return {
      photoList: [],
      status: "",
      errors: [],
      searchPhoto: "",
      currentPhoto: {},
      photo: "",
      selectedPhoto: "",
    };
  },
  mounted: function () {
    // this.getPhotos();
  },
  methods: {
    searchPhotos: function (photo) {
      // let apiKey = process.env.VUE_APP_PIXABAY_API_KEY;
      axios.get(`/api/photos?search=${photo}`).then((response) => {
        console.log(response.data);
        this.photoList = response.data;
      });
    },
    selectfromSearch: function (photo) {
      this.selectedPhoto = photo;
    },
    addToMoodboardModal: function (selectedPhoto) {
      this.currentPhoto = selectedPhoto;
      document.querySelector("#add-moodboard-modal").showModal();
    },
    addToMoodboard: function (currentPhoto) {
      let params = {
        url: this.currentPhoto,
      };
      axios.post("api/photos", params).then((response) => {
        console.log(response.data);
        console.log(currentPhoto);
      });
    },
  },
};
</script>
