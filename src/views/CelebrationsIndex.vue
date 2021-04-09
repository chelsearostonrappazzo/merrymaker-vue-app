<template>
  <div class="celebrations-index">
    <div v-for="celebration in celebrations" v-bind:key="celebration.id">
      <h1>{{ celebration.name }}</h1>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {},
  mounted: function () {
    this.indexCelebrations();
  },
  methods: {
    indexCelebrations: function () {
      axios.get("/api/celebrations").then((response) => {
        this.celebrations = response.data;
        console.log(this.celebrations);
      });
    },
  },
};
</script>
