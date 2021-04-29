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
        <div class="section-top-border">
          <div class="row">
            <div class="col-md-3">
              <img v-bind:src="user.image" alt="user.first_name" class="img-fluid" />
              <h1 class="mb-30">{{ user.full_name }}</h1>
              <q>{{ user.quote }}</q>

              <p>{{ user.email }}</p>
            </div>
          </div>
          <div class="col-md-9 mt-sm-20">
            <span v-for="photo in user.photos" :key="photo.id">
              <img :src="photo.photo" class="img-fluid" />
            </span>
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
  },
};
</script>
