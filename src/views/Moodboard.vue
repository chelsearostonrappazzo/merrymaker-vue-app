<template>
  <div class="moodboard">
    <section class="slider-area slider-area2 slider-height2 d-flex align-items-center hero-overly">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-11 col-md-12">
            <div class="hero__caption hero__caption2 text-center">
              <h2>Moodboard</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="about-details section-padding40">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-lg-6">
            <div class="section-tittle mb-50">
              <h2>It's the aesthetic for me.</h2>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="section-tittle mb-20">
              <div class="mt-10">
                <small><p>be sure to create a celebration before you start!</p></small>
                <p>
                  <small><router-link class="public-profile" to="/celebrations/new">start planning</router-link></small>
                </p>

                <input type="text" placeholder="your heart's desire" v-model="searchPhoto" />
                <button
                  type="submit"
                  v-on:click="searchPhotos(searchPhoto)"
                  class="genric-btn primary-border radius small"
                >
                  Search
                </button>
                <dialog id="add-moodboard-modal">
                  <form method="dialog">
                    <figure>
                      <img class="modal-img" :src="imageSelected.src" />
                      <figcaption>
                        <select v-model="selectedCelebration" class="modal-select">
                          <option disabled value="">Select Celebration</option>
                          <option
                            v-show="celebration.user_id == userId"
                            v-for="celebration in celebrations"
                            :value="celebration.id"
                            :key="celebration.id"
                          >
                            {{ celebration.name }}
                          </option>
                        </select>
                      </figcaption>
                    </figure>
                    <button class="genric-btn primary-border radius small" v-on:click="addToMoodboard(imageSelected)">
                      Add to Moodboard
                    </button>
                    <button class="genric-btn primary-border radius small">Close</button>
                  </form>
                </dialog>
              </div>
              <div class="upload-photo">
                <p>Can't find anything you like? Try uploading your own!</p>
                <div v-if="!image">
                  <input type="file" @change="onFileChange" />
                </div>
                <div v-else>
                <figure>
                  <img class="img-fluid profile-picture span-spacing" :src="image" />
                  <figcaption class="span-spacing">
                  <select v-model="selectedCelebration" class="modal-select">
                          <option disabled value="">Select Celebration</option>
                          <option
                            v-show="celebration.user_id == userId"
                            v-for="celebration in celebrations"
                            :value="celebration.id"
                            :key="celebration.id"
                          >
                            {{ celebration.name }}
                          </option>
                        </select>
                  </figcaption>
                </figure>
                  <button class="genric-btn primary-border radius small" @click="removeImage">Remove image</button>
                  <button class="genric-btn primary-border radius small" v-on:click="uploadToMoodboard(image)">
                    Add to Moodboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pexels-gallery">
      <vue-select-image
        :dataImages="photoList"
        @onselectimage="onSelectImage"
        ref="single-select-image"
      ></vue-select-image>

      <button @click="onUnselectSingleImage" class="genric-btn primary-border radius">Reset Selection</button>
    </div>
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
        color: "",
      },
      selectedCelebration: "",
      celebrations: [],
      image: "",
      userId: localStorage.getItem("user_id"),
    };
  },
  mounted: function () {
    this.indexCelebrations();
  },

  methods: {
    indexCelebrations: function () {
      axios.get("/api/celebrations").then((response) => {
        this.celebrations = response.data;
        console.log(this.celebrations);
      });
    },

    searchPhotos: function (photo) {
      axios
        .get(`/api/photos?search=${photo}`)
        .then((response) => {
          console.log(response.data);
          this.photoList = response.data;
        })
        .catch((errors) => console.log(errors.response));
    },

    addToMoodboard: function (imageSelected) {
      let params = {
        photo: this.imageSelected.src,
        src_id: this.imageSelected.src_id,
        color: this.imageSelected.color,
        celebration_id: this.selectedCelebration,
      };
      axios.post("api/photos", params).then((response) => {
        console.log(response.data);
        console.log(imageSelected);
        this.selectedCelebration = "";
        this.$alert("Photo added to Moodboard", "Huzzah!", "success", { confirmButtonText: "Yas!" });
      });
    },
    uploadToMoodboard: function (image) {
      let params = {
        photo: this.image,
        celebration_id: this.selectedCelebration,
      };
      axios.post("api/photos", params).then((response) => {
        console.log(response.data);
        console.log(image);
        this.image = "";
        this.$alert("Photo added to Moodboard", "Huzzah!", "success", { confirmButtonText: "Yas!" });
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
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      let image = new Image();
      let reader = new FileReader();
      let vm = this;
      console.log(image);
      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.image = "";
      console.log(e);
    },
  },
};
</script>
