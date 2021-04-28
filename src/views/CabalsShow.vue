<template>
  <div class="cabal-show">
    <section class="slider-area slider-area2 slider-height2 d-flex align-items-center hero-overly">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-11 col-md-12">
            <div class="hero__caption hero__caption2 text-center">
              <h2>Cabal</h2>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="about-details section-padding40">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-lg-6">
            <div class="section-tittle mb-50">
              <h2>{{ cabal.name }}</h2>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="section-tittle mb-20">
              <ol class="ordered-list">
                <li v-for="member in cabal.members" v-bind:key="member.id">
                  {{ member.first_name }} {{ member.last_name }}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container section-top-border">
      <div class="row">
        <div class="col-md-4">
          <div class="single-defination">
            <h3 class="mb-20">Add a MerryMaker</h3>
            <div class="invitation code">
              <button v-on:click="showInvitationToken()" class="genric-btn primary-border radius">Invite Code</button>
              <dialog id="invitation-token">
                <form method="dialog">
                  <h4>{{ cabal.invitation_token }}</h4>
                  <button
                    type="button"
                    v-clipboard:copy="cabal.invitation_token"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                    class="genric-btn primary-border radius small"
                  >
                    Copy
                  </button>
                  <button class="genric-btn primary-border radius small">Close</button>
                </form>
              </dialog>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div v-for="celebration in cabal.celebrations" v-bind:key="celebration.id" class="single-defination">
            <h2 class="mb-20">{{ celebration.name }}</h2>
            <div>
              <p>Theme</p>
              <p class="celeb-info">{{ celebration.theme }}</p>
              <p>Occasion</p>
              <p class="celeb-info">{{ celebration.occasion }}</p>
              <router-link
                v-bind:to="`/celebrations/${celebration.id}`"
                tag="button"
                class="genric-btn primary-border radius"
              >
                See All Info
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.celeb-info {
  font-style: italic;
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      errors: [],
      cabal: {},
      user: {},
      // members: [],
    };
  },
  mounted: function () {
    this.showCabals();
    this.indexMembers();
  },
  methods: {
    showCabals: function () {
      axios.get("/api/cabals/" + this.$route.params.id).then((response) => {
        console.log(response.data);
        this.cabal = response.data;
      });
    },
    indexMembers: function () {
      axios.get("/api/members/").then((response) => {
        console.log(response.data);
        this.members = response.data;
      });
    },
    showInvitationToken: function () {
      document.querySelector("#invitation-token").showModal();
    },
    onCopy: function (e) {
      alert("You just copied: " + e.text);
    },
    onError: function (e) {
      alert("Failed to copy texts");
      console.log(e);
    },
    // destroyMembers: function (member) {
    //   axios.delete("/api/members/" + member.id).then(() => {
    //     console.log("I'm Leabing the Group");
    //     let index = this.members.indexOf(member);
    //     this.members.splice(index, 1);
    //     this.$router.push("/profile");
    //   });
    // },
  },
};
</script>
