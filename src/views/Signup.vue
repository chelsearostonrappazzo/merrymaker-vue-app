<template>
  <div class="signup">
    <!-- <form v-on:submit.prevent="submit()">
      <h1>Signup</h1> -->
    <ul>
      <li class="text-danger" v-for="error in errors" v-bind:key="error">
        {{ error }}
      </li>
    </ul>
    <section class="slider-area slider-area2 slider-height2 d-flex align-items-center hero-overly">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-11 col-md-12">
            <div class="hero__caption hero__caption2 text-center">
              <h2>Join Us</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="container section-top-border">
      <h3 class="mb-30">Signup</h3>
      <form v-on:submit.prevent="submit()">
        <div class="col-lg-8 col-md-8">
          <div class="form-group">
            <div class="mt-10">
              <p>First Name</p>
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                onfocus="this.placeholder = ''"
                onblur="this.placeholder = 'First Name'"
                required
                class="single-input"
                v-model="firstName"
              />
            </div>
          </div>
          <div class="form-group">
            <div class="mt-10">
              <p>Last Name</p>
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                onfocus="this.placeholder = ''"
                onblur="this.placeholder = 'Last Name'"
                required
                class="single-input"
                v-model="lastName"
              />
            </div>
          </div>
          <div class="form-group">
            <div class="mt-10">
              <p>Email</p>
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
          </div>
          <div class="form-group">
            <div class="mt-10">
              <p>Password</p>
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
          </div>
          <div class="form-group">
            <div class="mt-10">
              <p>Password Confirmation</p>
              <input
                type="password"
                name="password_confirmation"
                placeholder="Password Confirmation"
                onfocus="this.placeholder = ''"
                onblur="this.placeholder = 'Password Confirmation'"
                required
                class="single-input"
                v-model="passwordConfirmation"
              />
            </div>
          </div>
          <div class="form-group">
            <div class="mt-10">
              <p>Invitation Code</p>
              <input
                type="text"
                name="invite_token"
                placeholder="Invitation Code"
                onfocus="this.placeholder = ''"
                onblur="this.placeholder = 'Invitation Code'"
                class="single-input"
                v-model="inviteToken"
              />
              <small>optional</small>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="col-lg-3 col-md-4 mt-sm-30">
            <div class="single-element-widget">
              <p>Profile Picture</p>
              <div v-if="!image">
                <input type="file" @change="onFileChange" />
              </div>
              <div v-else>
                <img class="img-fluid" :src="image" />
                <button class="genric-btn primary-border radius" @click="removeImage">Remove image</button>
              </div>
            </div>
          </div>
        </div>
        <input type="submit" class="genric-btn primary-border radius" value="Submit" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      firstName: "",
      lastName: "",
      image: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      inviteToken: "",
      errors: [],
    };
  },
  methods: {
    submit: function () {
      var params = {
        first_name: this.firstName,
        last_name: this.lastName,
        image: this.image,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
        invite_token: this.inviteToken,
      };
      axios
        .post("/api/users", params)
        .then((response) => {
          console.log(response.data);
          this.$alert("You're in!", "Success", "success");
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
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
