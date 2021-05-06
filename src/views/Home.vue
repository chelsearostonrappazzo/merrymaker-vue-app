<template>
  <div class="home">
    <div v-if="!isLoggedIn()" class="slider-area">
      <div class="slider-item">
        <div class="slider-bg1 slider-height hero-overly slider-bg1 d-flex align-items-center">
          <div class="container">
            <div class="row">
              <div class="col-xl-9 col-lg-10">
                <div class="slide-content">
                  <h1 class="welcome-big">MerryMaker</h1>
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
                <p>
                  <router-link to="/signup">Signup</router-link>
                  |
                  <router-link to="/login">Login</router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Logged-IN -->
    <div v-else class="slider-area">
      <div class="slider-item">
        <div class="slider-bg12 slider-height hero-overly slider-bg12 d-flex align-items-center">
          <div class="container">
            <div class="row">
              <div class="col-xl-9 col-lg-10">
                <div class="slide-content">
                  <h1 class="welcome-big">Welcome!</h1>
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
                <h4>Have a look around!</h4>
                <p>
                  <strong>
                    <router-link to="/profile">Profile</router-link>
                    |
                    <router-link to="/moodboard">Moodboard</router-link>
                    |
                    <router-link to="/celebrations/new">Start Planning</router-link>
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.welcome-big {
  text-shadow: 3px 3px #333;
}
</style>
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
