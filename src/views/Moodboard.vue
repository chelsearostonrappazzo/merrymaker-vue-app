<template>
  <div class="moodboard">
    <h1>Moodboard</h1>
    <input type="text" placeholder="it's the aesthetic for me" v-model="searchPhoto" />
    <button type="submit" v-on:click="searchPhotos(searchPhoto)">Search</button>
    <vue-select-image
      :dataImages="photoList"
      @onselectimage="onSelectImage"
      ref="single-select-image"
    ></vue-select-image>
    <div>
      <span v-if="imageSelected.src_id !== ''">
        <span>id = {{ imageSelected.src_id }}</span>
      </span>
      <button @click="onUnselectSingleImage">Reset Selection</button>
    </div>
    <dialog id="add-moodboard-modal">
      <form method="dialog">
        {{ imageSelected.src }}
        <button v-on:click="addToMoodboard(imageSelected)">Add to Moodboard</button>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      photoList: [],
      status: "",
      errors: [],
      searchPhoto: "",
      photo: "",
      imageSelected: {
        src_id: "",
        src: "",
        alt: "",
      },
    };
  },
  mounted: function () {},
  methods: {
    searchPhotos: function (photo) {
      axios.get(`/api/photos?search=${photo}`).then((response) => {
        console.log(response.data);
        this.photoList = response.data;
      });
    },
    addToMoodboard: function (imageSelected) {
      let params = {
        photo: this.imageSelected.src,
        src_id: this.imageSelected.src_id,
      };
      axios.post("api/photos", params).then((response) => {
        console.log(response.data);
        console.log(imageSelected);
      });
    },
    onSelectImage: function (data) {
      console.log("fire event onSelectImage:  ", data);
      this.imageSelected = data;
      document.querySelector("#add-moodboard-modal").showModal();
    },
    onUnselectSingleImage: function () {
      this.$refs["single-select-image"].removeFromSingleSelected();
    },
  },
};
</script>
