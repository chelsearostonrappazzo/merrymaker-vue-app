<template>
  <div class="celebrations-index">
    <div v-for="celebration in celebrations" v-bind:key="celebration.id">
      <router-link v-bind:to="`celebrations/${celebration.id}`">
        <h2>{{ celebration.name }}</h2>
      </router-link>
      <p>Celebrant: {{ celebration.user_id }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      celebrations: [],
    };
  },
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
