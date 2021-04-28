<template>
  <div class="slider-area">
    <div class="slider-item">
      <div class="slider-bg2 slider-height hero-overly slider-bg1 d-flex align-items-center">
        <div class="container">
          <div class="row">
            <div class="col-xl-9 col-lg-10">
              <div class="slide-content">
                <h1>404.</h1>
                <h2 class="not-found">We can't even.</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="slider-caption2">
      <div class="container">
        <div class="row">
          <div class="col-xl-4 col-lg-4 col-md-7 col-sm-8">
            <div class="slide-content2">
              <h4>Oh no! Try one of these!</h4>
              <p>
                <router-link to="/" tag="button" class="genric-btn primary-border radius">Home</router-link>
                <router-link to="/profile" tag="button" class="genric-btn primary-border radius">Profile</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.not-found {
  color: white;
  font-size: 75px;
}
</style>
