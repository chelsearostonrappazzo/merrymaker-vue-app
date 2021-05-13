<template>
  <div id="app">
    <!-- <div id="preloader-active">
      <div class="preloader d-flex align-items-center justify-content-center">
        <div class="preloader-inner position-relative">
          <div class="preloader-circle"></div>
          <div class="preloader-img pere-text">
            <img src="assets/img/logo/loder.png" alt="" />
          </div>
        </div>
      </div>
    </div> -->

    <header>
      <!--? Header Start -->
      <div class="header-area">
        <div class="main-header header-sticky">
          <div class="container-fluid">
            <div class="row align-items-center">
              <!-- Logo -->
              <div class="col-xl-2 col-lg-2 col-md-1">
                <div class="logo">
                  <a href="/"><img src="/assets/img/logo/merrymakerlogo.png" alt="" /></a>
                </div>
              </div>
              <div class="col-xl-9 col-lg-10">
                <div class="main-menu black-menu menu-bg-white d-none d-lg-block">
                  <!-- <div class="hamburger hamburger--collapse">
                    <div class="hamburger-box">
                      <div class="hamburger-inner"></div>
                    </div>
                  </div> -->
                  <nav class="non-burger">
                    <ul id="navigation">
                      <li><a href="/">Home</a></li>
                      <li><a href="/about">About</a></li>
                      <li v-if="!isLoggedIn()"><a href="/signup">Signup</a></li>
                      <li v-if="!isLoggedIn()"><a href="/login">Login</a></li>
                      <li v-if="isLoggedIn()"><a href="/logout">Logout</a></li>
                      <li v-if="isLoggedIn()"><a href="/celebrations">Celebrations</a></li>
                      <!-- <li><a href="/cabals">Cabals</a></li> -->

                      <li v-if="isLoggedIn()">
                        <strong>{{ user.first_name }} {{ user.last_name }}</strong>
                        <ul class="submenu">
                          <li><a href="/profile">Profile</a></li>
                          <li><a href="/profile/edit">Edit</a></li>
                          <li><a href="/celebrations/new">Start Planning</a></li>
                          <li><a href="/moodboard">Moodboard</a></li>
                          <li><a href="/gallery">Gallery</a></li>
                        </ul>
                      </li>
                      <li v-else><strong>Greetings!</strong></li>
                    </ul>
                  </nav>
                </div>
              </div>
              <!-- Mobile Menu -->
              <div class="col-12">
                <div class="mobile_menu d-block d-lg-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Header End -->
    </header>
    <router-view />

    <footer>
      <div class="footer-wrappper">
        <!-- Footer Start-->
        <div class="footer-area footer-padding">
          <div class="container">
            <div class="row">
              <div class="col-xl-12">
                <div class="single-footer-caption mb-50 text-center">
                  <!-- logo -->
                  <div class="footer-logo mb-25">
                    <a href="index.html"><img src="/assets/img/logo/merrymake2r.png" alt="" /></a>
                  </div>
                  <!-- meNU -->
                  <div class="main-menu2">
                    <nav>
                      <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li v-if="isLoggedIn()"><a href="/profile">Profile</a></li>
                        <li v-if="isLoggedIn()"><a href="/celebrations">Celebrations</a></li>
                        <li v-if="isLoggedIn()"><a href="/moodboard">Moodboard</a></li>
                        <li v-if="isLoggedIn()"><a href="/gallery">Gallery</a></li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- footer-bottom area -->
        <div class="footer-bottom-area">
          <div class="container">
            <div class="footer-border">
              <div class="row d-flex align-items-center">
                <div class="col-xl-12">
                  <div class="footer-copy-right text-center">
                    <p>
                      <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                      Copyright &copy;
                      <!-- <script>
                        document.write(new Date().getFullYear());
                      </script> -->
                      All rights reserved | This template is made with
                      <i class="fa fa-heart" aria-hidden="true"></i>
                      by
                      <a href="https://colorlib.com" target="_blank">Colorlib</a>
                      <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Footer End-->
      </div>
    </footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
    };
  },

  created: function () {
    this.showUser();
  },
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
    showUser: function () {
      axios.get("api/profile").then((response) => {
        console.log("whoo!");
        this.user = response.data;
      });
    },
  },
};
</script>
