<template>
  <div class="users-edit">
    <section class="slider-area slider-area2 slider-height2 d-flex align-items-center hero-overly">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-11 col-md-12">
            <div class="hero__caption hero__caption2 text-center">
              <h2>Change is Good</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="container section-top-border">
      <div class="row">
        <h2 class="mb-30">Update Your Information</h2>
        <div class="col-lg-12 col-md-8">
          <form v-on:submit.prevent="updateUser(user)">
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
                v-model="user.first_name"
              />
            </div>
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
                v-model="user.last_name"
              />
            </div>
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
                v-model="user.email"
              />
            </div>
            <div class="mt-10">
              <p>Password</p>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onfocus="this.placeholder = ''"
                onblur="this.placeholder = 'Password'"
                class="single-input"
                v-model="password"
              />
            </div>
            <div class="mt-10">
              <p>Quote</p>
              <input
                type="text"
                name="quote"
                placeholder="Quote"
                onfocus="this.placeholder = ''"
                onblur="this.placeholder = 'Quote'"
                class="single-input"
                v-model="user.quote"
              />
            </div>
            <input type="submit" class="genric-btn primary-border radius" value="Update" />
          </form>
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
      errors: [],
      user: {},
      image: "",
      password: "",
    };
  },
  mounted: function () {
    axios.get("api/profile").then((response) => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {
    updateUser: function (user) {
      let params = {
        first_name: user.first_name,
        last_name: user.last_name,
        password: user.password_digest,
        email: user.email,
        quote: user.quote,
      };
      axios
        .patch("/api/users/" + this.$route.params.id, params)
        .then(() => {
          this.$router.push("/profile");
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
  },
};
</script>
