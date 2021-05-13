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
          <!-- Celebration Info -->
          <div class="col-lg-6 posts-list">
            <h1>{{ celebration.celebrant }}</h1>
            <h3><small>Celebrant</small></h3>
            <p>
              <strong>Status: {{ celebration.status }}</strong>

              <small>
                <a
                  v-if="showStatus()"
                  class="public-profile span-spacing"
                  href=""
                  v-on:click="destroyCelebration(celebration)"
                >
                  complete?
                </a>
              </small>
            </p>

            <span>theme</span>
            <p>{{ celebration.theme }}</p>
            <span>occasion</span>
            <p>{{ celebration.occasion }}</p>
            <span>location</span>
            <p>{{ celebration.location }}</p>
            <span>colors</span>
            <p>{{ celebration.colors }}</p>
            <span>signature drink</span>
            <p>{{ celebration.signature_drink }}</p>
            <span>cabal</span>
            <p>{{ celebration.cabal }}</p>
            <!-- Can see if Celebrant -->
            <div v-if="isCelebrant()" class="celebrant-buttons">
              <router-link
                v-bind:to="`/celebrations/${celebration.id}/edit`"
                tag="button"
                class="genric-btn primary-border radius small"
              >
                Edit
              </router-link>

              <button class="genric-btn primary-border radius small" v-on:click="openGuestModal()">Add Guests</button>
              <dialog id="add-celebration-guest">
                <form method="dialog">
                  <select v-model="selectedUser">
                    <option disabled value="">Select Guest</option>
                    <option v-for="user in users" :key="user.id" :value="user.id">
                      {{ user.first_name }} {{ user.last_name }}
                    </option>
                  </select>
                  <button class="genric-btn primary-border radius small" v-on:click="addGuest(selectedUser)">
                    Add Guest
                  </button>
                  <button class="genric-btn primary-border radius small">Close</button>
                </form>
              </dialog>
            </div>
            <!-- Comments -->
            <div class="comments-area">
              <h2>
                Chat
                <small>
                  <a class="public-profile" href="" @click.prevent="showGuests = !showGuests">see members</a>
                </small>
              </h2>

              <ul v-show="showGuests" class="ordered-list">
                <li v-for="guest in celebration.guests" :key="guest.id">
                  {{ guest.first_name }} {{ guest.last_name }}
                  <small>
                    <router-link class="public-profile" :to="`/user/${guest.id}`">view profile</router-link>
                  </small>
                </li>
              </ul>
              <div class="comment-list" v-for="comment in celebration.comments" :key="comment.id">
                <div class="single-comment justify-content-between d-flex">
                  <div class="user justify-content-between d-flex">
                    <div class="thumb">
                      <img :src="comment.user.image" alt="" />
                    </div>
                    <div class="desc">
                      <p class="comment">
                        {{ comment.body }}
                        <small>
                          <a
                            v-if="isAuthor(comment)"
                            class="public-profile span-spacing"
                            href=""
                            v-on:click="destroyComment(comment)"
                          >
                            delete
                          </a>
                        </small>
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
          <!-- Moodboard -->
          <div class="col-lg-6">
            <h2>The Aesthetic</h2>
            <router-link v-if="isCelebrant()" class="public-profile span-spacing" to="/moodboard">
              add to moodboard
            </router-link>
            <h3 class="aesthetic-header">The Inspiration</h3>
            <div class="moodboard-gallery-1">
              <div class="moodboard-gallery-panel-1" v-for="moodboard in celebration.moodboards" :key="moodboard.id">
                <img :src="moodboard.photo.photo" class="img-fluid" />
              </div>
            </div>
            <h3 class="aesthetic-header">The Result</h3>
            <div class="moodboard-gallery-1">
              <div
                class="moodboard-gallery-panel-1"
                v-for="celebration_photos in celebration.celebration_photoss"
                :key="celebration_photos.id"
              >
                <img :src="celebration_photos.photo.photo" class="img-fluid" />
              </div>
            </div>
          </div>
        </div>
        <!-- Leave A Comment -->
        <div v-if="isGuest()">
          <h4>Leave a Reply</h4>
          <div class="wrapper-comment">
            <textarea class="comment-regular-input" v-model="body" placeholder="Write Comment"></textarea>
            <!-- Emoji Add-on -->
            <emoji-picker @emoji="append" :search="search">
              <div
                class="emoji-invoker"
                slot="emoji-invoker"
                slot-scope="{ events: { click: clickEvent } }"
                @click.stop="clickEvent"
              >
                <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                  />
                </svg>
              </div>
              <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
                <div class="emoji-picker" :style="{ top: display.y + 'px', left: display.x + 'px' }">
                  <div class="emoji-picker__search">
                    <input type="text" v-model="search" v-focus />
                  </div>
                  <div>
                    <div v-for="(emojiGroup, category) in emojis" :key="category">
                      <h5>{{ category }}</h5>
                      <div class="emojis">
                        <span
                          v-for="(emoji, emojiName) in emojiGroup"
                          :key="emojiName"
                          @click="insert(emoji)"
                          :title="emojiName"
                        >
                          {{ emoji }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </emoji-picker>
            <button v-on:click="addComment()" class="button button-contactForm btn_1 boxed-btn">Post Comment</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      errors: [],
      celebration: {},
      comments: [],
      body: "",
      search: "",
      input: "",
      selectedUser: "",
      users: [],
      showGuests: false,
    };
  },
  mounted: function () {
    this.showCelebrations();
    this.indexUsers();
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
    showStatus: function () {
      let userId = localStorage.getItem("user_id");
      return userId == this.celebration.user_id && this.celebration.status === "Planning";
    },
    destroyCelebration: function (celebration) {
      axios.delete("/api/celebrations/" + celebration.id).then(() => {
        console.log("Event is completed!");
        this.$router.push("/celebrations");
      });
    },
    addComment: function () {
      let params = {
        body: this.body,
        celebration_id: this.celebration.id,
      };
      axios.post("/api/comments", params).then((response) => {
        this.celebration.comments.push(response.data);
        console.log(response.data, "You did it!");
        this.body = "";
      });
    },
    append(emoji) {
      this.body += emoji;
    },
    destroyComment: function (comment) {
      axios.delete("/api/comments/" + comment.id).then(() => {
        console.log("Deleted!");
        this.comments.splice(this.comments.indexOf(comment), 1);
      });
    },
    isAuthor: function (comment) {
      let userId = localStorage.getItem("user_id");
      return userId == comment.user.id;
    },
    addGuest: function (selectedUser) {
      let params = {
        celebration_id: this.celebration.id,
        user_id: this.selectedUser,
      };
      axios
        .post("/api/guests", params)
        .then((response) => {
          console.log(response.data, selectedUser);
          this.celebration.guests.push(response.data);
          this.$alert("Guest added to " + this.celebration.name);
        })
        .catch((errors) => {
          console.log(errors.response);
          this.$alert("User is already in group!", "Error", "warning");
        });
    },
    openGuestModal: function () {
      document.querySelector("#add-celebration-guest").showModal();
    },
    indexUsers: function () {
      axios.get("/api/users").then((response) => {
        this.users = response.data;
        console.log(this.users);
      });
    },
    isGuest: function () {
      let userId = localStorage.getItem("user_id");
      return this.celebration.guests.find((user) => user.id == userId);
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
};
</script>
