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
        <div class="section-top-border text-left">
          <div class="row">
            <div class="col-md-3">
              <img v-bind:src="user.image" alt="user.first_name" class="img-fluid" />
              <h1 class="mb-30">{{ user.full_name }}</h1>
              <p>{{ user.email }}</p>
              <router-link v-bind:to="`/profile/edit`" tag="button" class="genric-btn primary-border radius">
                Edit Profile
              </router-link>
            </div>
            <!-- <img v-bind:src="user.image" alt="user.full_name" />
          </div> -->
            <div class="col-md-9 mt-sm-20">
              <div class="section-tittle mb-50">
                <h1>Dashboard</h1>
              </div>
              <div class="section-tittle mb-20">
                <h3>Create a Cabal!</h3>
                <form v-on:submit.prevent="createCabal()">
                  <div class="form-group">
                    <div class="mt-10">
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder =
          'Name'"
                        required
                        class="single-input"
                        v-model="name"
                      />
                    </div>

                    <!-- <input type="text" class="form-control" v-model="name" /> -->
                    <input type="submit" class="genric-btn primary-border radius small" value="Create" />
                  </div>
                </form>
              </div>
              <div class="section-tittle mb-20">
                <h3>Join a Cabal!</h3>
                <form v-on:submit.prevent="joinCabal()">
                  <div class="form-group">
                    <div class="mt-10">
                      <input
                        type="text"
                        name="invitation-code"
                        placeholder="Invitation Code"
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder =
          'Name'"
                        required
                        class="single-input"
                        v-model="invitation_token"
                      />
                    </div>
                    <!-- <div class="form-group">
                  <label>Invitation Code</label>
                  <input type="text" class="form-control" v-model="invitation_token" />
                </div> -->
                  </div>
                  <input type="submit" class="genric-btn primary-border radius small" value="Join" />
                </form>
              </div>
              <div class="section-tittle mb-20">
                <h3>Cabals</h3>
                <div v-for="cabal in user.cabals" v-bind:key="cabal.id">
                  <p>{{ cabal.name }}</p>
                  <router-link
                    v-bind:to="`/cabals/${cabal.id}`"
                    tag="button"
                    class="genric-btn primary-border radius small"
                  >
                    See More Details
                  </router-link>
                </div>
              </div>
              <div class="section-top-border text-right">
                <h2>Ready to Start Planning?</h2>
                <router-link to="/celebrations/new" tag="button" class="genric-btn primary-border radius">
                  Add Celebration
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
img {
  height: 250px;
  width: auto;
}
</style>
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
    joinCabal: function () {
      let params = {
        invitation_token: this.invitation_token,
      };
      axios
        .post("/api/members", params)
        .then(() => {
          this.invitation_token = "";
          this.$router.push("/profile");
        })
        .catch((errors) => console.log(errors.response));
    },
    createCabal: function () {
      let params = { name: this.name };
      axios
        .post("/api/cabals", params)
        .then(() => {
          this.$router.push("/profile");
          this.name = "";
        })
        .catch((errors) => console.log(errors.response));
    },
  },
};
</script>
