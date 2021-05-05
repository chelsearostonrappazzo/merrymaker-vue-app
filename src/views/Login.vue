<template>
  <div class="login">
    <section class="slider-area slider-area2 slider-height2 d-flex align-items-center hero-overly">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-11 col-md-12">
            <div class="hero__caption hero__caption2 text-center">
              <h2>Welcome Back</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="container section-top-border text-left">
      <h3 class="mb-30">Login</h3>
      <div class="row">
        <form v-on:submit.prevent="submit()">
          <ul>
            <li class="text-danger" v-for="error in errors" v-bind:key="error">
              {{ error }}
            </li>
          </ul>
          <div class="mt-10">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Email'"
              required
              class="single-input"
              v-model="email"
            />
          </div>
          <div class="mt-10">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Password'"
              required
              class="single-input"
              v-model="password"
            />
          </div>

          <input type="submit" class="genric-btn primary-border radius" value="Submit" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function () {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push("/profile");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
