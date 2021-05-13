<template>
  <div class="user-show">
    <section class="slider-area slider-area2 slider-height2 d-flex align-items-center hero-overly">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-11 col-md-12">
            <div class="hero__caption hero__caption2 text-center">
              <h2>Profile</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="whole-wrap">
      <div class="container box_1170">
        <div class="section-top-border text-left">
          <div class="row">
            <div class="col-md-3">
              <div class="single-element-widget edit-image">
                <div v-if="user.image">
                  <img v-bind:src="user.image" alt="user.first_name" class="img-fluid" />
                  <button class="genric-btn primary-border radius small" @click="removeImage">Change</button>
                </div>
                <div v-else-if="image">
                  <img class="profile-picture" :src="image" />
                  <button v-on:click="updateUser()" class="genric-btn primary-border radius small">Save</button>
                </div>
                <div v-else>
                  <h2>No Image</h2>
                  <input
                    type="file"
                    @change="onFileChange"
                    data-direct-upload-url="/rails/active_storage/direct_uploads"
                    direct_upload="true"
                  />
                  <button v-on:click="updateUser(user)" class="genric-btn primary-border radius small">Save</button>
                </div>
              </div>
              <h1 class="mb-30">{{ user.full_name }}</h1>
              <q>{{ user.quote }}</q>

              <p>{{ user.email }}</p>
              <p><router-link class="public-profile" v-bind:to="`/profile/edit`">Edit Info</router-link></p>
              <p><router-link class="public-profile" :to="`/user/${user.id}`">View Your Profile</router-link></p>
              <p><router-link class="public-profile" to="/celebrations/new">Add Celebration</router-link></p>
            </div>

            <div class="col-md-9 mt-sm-20">
              <div class="section-tittle mb-50">
                <h1 class="mb-30">Dashboard</h1>
                <div class="row">
                  <div class="col-md-4">
                    <div class="single-defination">
                      <h3 class="mb-20">Cabals</h3>
                      <div v-if="!user.cabals">
                        <p>You're not in any cabals.</p>
                      </div>
                      <div v-else>
                        <ol class="ordered-list">
                          <li v-for="cabal in user.cabals" v-bind:key="cabal.id">
                            {{ cabal.name }}
                            <router-link class="public-profile" v-bind:to="`/cabals/${cabal.id}`">Details</router-link>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="single-defination">
                      <h3 class="mb-20">Join A Cabal</h3>
                      <form v-on:submit.prevent="joinCabal()">
                        <div class="form-group">
                          <div class="mt-10">
                            <input
                              type="text"
                              name="invitation-code"
                              placeholder="Invitation Code"
                              onfocus="this.placeholder = ''"
                              onblur="this.placeholder = 'Name'"
                              required
                              class="single-input"
                              v-model="invitation_token"
                            />
                          </div>
                        </div>
                        <input type="submit" class="genric-btn primary-border radius small" value="Join" />
                      </form>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="single-defination">
                      <h3 class="mb-20">Create a Cabal</h3>
                      <form v-on:submit.prevent="createCabal()">
                        <div class="form-group">
                          <div class="mt-10">
                            <input
                              type="text"
                              name="name"
                              placeholder="Name"
                              onfocus="this.placeholder = ''"
                              onblur="this.placeholder = 'Name'"
                              required
                              class="single-input"
                              v-model="name"
                            />
                          </div>
                        </div>
                        <input type="submit" class="genric-btn primary-border radius small" value="Create" />
                      </form>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="single-defination">
                      <h3 class="mb-20">Show off your event!</h3>
                      <div v-if="image">
                        <figure>
                          <img class="img-fluid profile-picture span-spacing" :src="image" />
                          <figcaption class="span-spacing">
                            <select v-model="selectedCelebration" class="modal-select">
                              <option disabled value="">Select Celebration</option>
                              <option
                                v-for="celebration in user.celebrations"
                                :value="celebration.id"
                                :key="celebration.id"
                              >
                                {{ celebration.name }}
                              </option>
                            </select>
                          </figcaption>
                        </figure>
                      </div>
                      <div v-else>
                        <input
                          type="file"
                          @change="onFileChange"
                          data-direct-upload-url="/rails/active_storage/direct_uploads"
                          direct_upload="true"
                        />
                      </div>
                      <button
                        class="genric-btn primary-border radius small"
                        v-on:click="createCelebrationPhotos(image)"
                      >
                        Add to Event Photos
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
      user: {},
      errors: [],
      name: "",
      invitation_token: "",
      image: "",
      selectedCelebration: "",
    };
  },
  mounted: function () {
    this.showUser();
  },
  watch: {},
  // updated: function () {
  //   this.showUser();
  // },
  methods: {
    showUser: function () {
      axios.get("/api/profile").then((response) => {
        console.log(response.data);
        this.user = response.data;
      });
    },
    joinCabal: function () {
      let params = {
        invitation_token: this.invitation_token,
      };
      axios
        .post("/api/members", params)
        .then((response) => {
          this.$alert("You're In!", "Success", "success");
          this.user.cabals.push(response.data);
          this.invitation_token = "";
        })
        .catch((errors) => {
          console.log(errors.response);
          this.$alert("You're already in this cabal!", "Error", "warning");
          this.invitation_token = "";
        });
    },
    createCabal: function () {
      let params = { name: this.name };
      axios
        .post("/api/cabals", params)
        .then((response) => {
          this.user.cabals.push(response.data);
          this.$alert(this.name + " created!");
          this.name = "";
        })
        .catch((errors) => console.log(errors.response));
    },
    updateUser: function () {
      let params = {
        image: this.image,
      };
      axios
        .patch("/api/users/" + this.user.id, params)
        .then((response) => {
          console.log(response.data);

          this.$router.go(0);
        })
        .catch((errors) => console.log(errors.response));
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.file = files[0];
      this.createImage(this.file);
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
      this.user.image = "";
      console.log(e);
    },
    createCelebrationPhotos: function (image) {
      let params = {
        photo: this.image,
        celebration_id: this.selectedCelebration,
      };
      axios.post("api/photos", params).then((response) => {
        console.log(response.data);
        console.log(image);
        this.image = "";
        this.$alert("Photo added to Board", "Huzzah!", "success", { confirmButtonText: "Yas!" });
      });
    },
  },
};
</script>
