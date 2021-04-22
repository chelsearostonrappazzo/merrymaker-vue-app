<template>
  <div class="users-edit">
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
      <div v-if="!image">
        <h2>No Image :(</h2>
        <input type="file" @change="onFileChange" />
      </div>
      <div v-else>
        <img :src="image" />
        <button @click="removeImage">Remove image</button>
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
        image: user.image,
      };
      axios
        .patch("/api/users/" + this.$route.params.id, params)
        .then(() => {
          this.$router.push("/profile");
        })
        .catch((error) => console.log(error.response));
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
