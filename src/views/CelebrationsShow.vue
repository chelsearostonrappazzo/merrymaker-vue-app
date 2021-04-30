<template>
  <div class="celebrations-show">
    <section class="slider-area slider-area2 slider-height2 d-flex align-items-center hero-overly">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-11 col-md-12">
            <div class="hero__caption hero__caption2 text-center">
              <h2>{{ celebration.name }}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="blog_area single-post-area section-padding">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 posts-list">
            <h1>{{ celebration.celebrant }}</h1>
            <h3><small>Celebrant</small></h3>
            <p>
              <strong>Status: {{ celebration.status }}</strong>
            </p>
            <p>Theme</p>
            <p>{{ celebration.theme }}</p>
            <p>Occasion: {{ celebration.occasion }}</p>
            <p>Location: {{ celebration.location }}</p>
            <p>Colors: {{ celebration.colors }}</p>
            <p>Signature Drink: {{ celebration.signature_drink }}</p>
            <p>Cabal: {{ celebration.cabal }}</p>
            <p>Notes: {{ celebration.notes }}</p>
            <div v-if="isCelebrant()" class="celebrant-buttons">
              <router-link
                v-bind:to="`/celebrations/${celebration.id}/edit`"
                tag="button"
                class="genric-btn primary-border radius"
              >
                Edit
              </router-link>
              <button class="genric-btn primary-border radius" v-on:click="destroyCelebration(celebration)">
                Completed?
              </button>
              <router-link to="/moodboard" tag="button" class="genric-btn primary-border radius">Moodboard</router-link>
            </div>
            <div class="comments-area">
              <h2>Discussion</h2>
              <div class="comment-list" v-for="comment in celebration.comments" :key="comment.id">
                <div class="single-comment justify-content-between d-flex">
                  <div class="user justify-content-between d-flex">
                    <div class="thumb">
                      <img :src="comment.user.image" alt="" />
                    </div>
                    <div class="desc">
                      <p class="comment">
                        {{ comment.body }}
                      </p>
                      <div class="d-flex justify-content-between">
                        <div class="d-flex align-items-center">
                          <h5>{{ comment.user.first_name }} {{ comment.user.last_name }}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6">
            <h2>The Aesthetic</h2>
            <div class="moodboard-gallery">
              <div class="moodboard-gallery-panel" v-for="photo in celebration.photos" :key="photo.id">
                <img :src="photo.photo" class="img-fluid" />
              </div>
            </div>
          </div>

          <div class="col-lg-8">
            <div class="comment-form">
              <h4>Leave a Reply</h4>
              <form v-on:submit="addComment()">
                <div class="row">
                  <div class="col-12">
                    <div class="form-group">
                      <textarea
                        class="form-control w-100"
                        name="comment"
                        v-model="body"
                        cols="30"
                        rows="9"
                        placeholder="Write Comment"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <button type="submit" class="button button-contactForm btn_1 boxed-btn">Post Comment</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style>
.guest-comments {
  float: right;
}

.moodboard-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: 1rem;
  max-width: 250rem;
  margin: 5rem auto;
  padding: 0 5rem;
}
.moodboard-gallery-panel img {
  width: 100%;
  height: 15vw;
  object-fit: cover;
  border-radius: 0.75rem;
}
</style>
<script>
import axios from "axios";

export default {
  data: function () {
    return {
      errors: [],
      celebration: {},
      comments: [],
      body: "",
    };
  },
  mounted: function () {
    this.showCelebrations();
    this.getComments();
  },
  methods: {
    showCelebrations: function () {
      axios.get("/api/celebrations/" + this.$route.params.id).then((response) => {
        console.log(response.data);
        this.celebration = response.data;
      });
    },
    isCelebrant: function () {
      let userId = localStorage.getItem("user_id");
      return userId == this.celebration.user_id;
    },
    destroyCelebration: function (celebration) {
      axios.delete("/api/celebrations/" + celebration.id).then(() => {
        console.log("Event is completed!");
        this.$router.push("/celebrations");
      });
    },
    getComments: function () {
      axios.get("/api/comments").then((response) => {
        console.log(response.data);
        this.comments = response.data;
      });
    },
    addComment: function () {
      let params = {
        body: this.body,
        celebration_id: this.celebration.id,
      };
      axios.post("/api/comments", params).then((response) => {
        console.log(response.data, "You did it!");
      });
    },
  },
};
</script>
