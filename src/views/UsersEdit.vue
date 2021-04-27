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
    <form v-on:submit.prevent="updateUser(user)">
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>First Name</label>
        <input type="text" class="form-control" v-model="user.first_name" />
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input type="text" class="form-control" v-model="user.last_name" />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="text" class="form-control" v-model="user.email" />
      </div>
      <!-- <div class="form-group">
        <label>Profile Picture</label>
        <input type="text" class="form-control" v-model="user.image" />
      </div> -->
      <div v-if="user.image">
        <img :src="user.image" />
        <button @click="removeImage">Remove image</button>
      </div>
      <div v-else>
        <h2>No Image :(</h2>
        <input type="file" @change="onFileChange" />
      </div>
      <input type="submit" class="btn btn-primary" value="Update" />
    </form>
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
    };
  },
  created: function () {
    axios.get("api/users/" + this.$route.params.id).then((response) => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {
    updateUser: function (user) {
      let params = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        image: this.image,
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
