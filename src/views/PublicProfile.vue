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
      <div class="container">
        <div class="section-top-border">
          <div class="row">
            <div class="col-md-3">
              <img v-bind:src="user.image" alt="user.first_name" class="img-fluid" />
              <h1 class="mb-30">{{ user.full_name }}</h1>
              <q>{{ user.quote }}</q>

              <p>{{ user.email }}</p>
              <p v-if="isUser()"><router-link class="public-profile" to="/profile/edit">Edit Profile</router-link></p>
            </div>
            <div class="col-md-9">
              <h1>My Aesthetic</h1>
              <div class="moodboard-gallery">
                <div class="moodboard-gallery-panel" v-for="photo in user.photos" :key="photo.id">
                  <img :src="photo.photo" class="img-fluid" />
                </div>
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
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: 1rem;
  max-width: 250rem;
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
      user: {},
      errors: [],
      name: "",
      invitation_token: "",
    };
  },
  mounted: function () {
    this.showUser();
  },
  methods: {
    showUser: function () {
      axios.get("api/users/" + this.$route.params.id).then((response) => {
        console.log(response.data);
        this.user = response.data;
      });
    },
    isUser: function () {
      let userId = localStorage.getItem("user_id");
      console.log(userId);
      console.log(this.user.id);
      return userId == this.user.id;
    },
  },
};
</script>
