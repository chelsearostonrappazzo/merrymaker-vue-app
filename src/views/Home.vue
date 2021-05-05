<template>
  <div class="home">
    <div class="slider-area">
      <div class="slider-item">
        <div class="slider-bg1 slider-height hero-overly slider-bg1 d-flex align-items-center">
          <div class="container">
            <div class="row">
              <div class="col-xl-9 col-lg-10">
                <div class="slide-content">
                  <h1>MerryMaker</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="slider-caption2">
        <div class="container">
          <div class="row">
            <div class="col-xl-4 col-lg-4 col-md-7 col-sm-8">
              <div class="slide-content2">
                <h4>Because who even likes surprises?</h4>
                <p v-if="!isLoggedIn()">
                  <router-link to="/signup" tag="button" class="genric-btn primary-border radius">Signup</router-link>
                  <router-link to="/login" tag="button" class="genric-btn primary-border radius">Login</router-link>
                </p>
                <p v-else>
                  <router-link to="/profile" tag="button" class="genric-btn primary-border radius">Profile</router-link>
                  <router-link to="/moodboard" tag="button" class="genric-btn primary-border radius">
                    Moodboard
                  </router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      message: "MerryMaker",
      name: "",
      errors: [],
    };
  },
  created: function () {},
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
      // if (localStorage.getItem("jwt")) {
      // return true;
      // } else {
      // return false;
      // }
    },
  },
};
</script>
