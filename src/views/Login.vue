<template>
  <div class="container login">
    <div class="section-top-border text-left">
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
          <!-- <div class="form-group">
            <label>Email:</label>
            <input type="email" class="form-control" v-model="email" />
          </div>
          <div class="form-group">
            <label>Password:</label>
            <input type="password" class="form-control" v-model="password" />
          </div> -->
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
