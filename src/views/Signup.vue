<template>
  <div class="signup">
    <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>First Name:</label>
        <input type="text" class="form-control" v-model="firstName" />
      </div>
      <div class="form-group">
        <label>Last Name:</label>
        <input type="text" class="form-control" v-model="lastName" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" class="form-control" v-model="email" />
      </div>
      <div class="form-group">
        <label>Invitation Code:</label>
        <input type="text" class="form-control" v-model="inviteToken" />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" class="form-control" v-model="password" />
      </div>
      <div class="form-group">
        <label>Password confirmation:</label>
        <input type="password" class="form-control" v-model="passwordConfirmation" />
        <small v-if="passwordConfirmation !== password" class="text-danger">Your passwords must match!</small>
      </div>
      <div class="form-group">
        <label>Profile Photo:</label>
        <div v-if="!image">
          <h2>No Image :(</h2>
          <input type="file" @change="onFileChange" />
        </div>
        <div v-else>
          <img :src="image" />
          <button @click="removeImage">Remove image</button>
        </div>
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
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
