<template>
  <div class="celebrations-index">
    <h3>Filter By Status</h3>
    <select v-model="status">
      <option value="Planning">Planning</option>
      <option value="Completed">Completed</option>
    </select>
    <div v-for="celebration in filterCelebrationsByStatus" v-bind:key="celebration.id">
      <router-link v-bind:to="`celebrations/${celebration.id}`">
        <h2>{{ celebration.name }}</h2>
      </router-link>
      <p>Celebrant: {{ celebration.celebrant }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      celebrations: [],
      status: "",
    };
  },
  mounted: function () {
    this.indexCelebrations();
  },
  computed: {
    filterCelebrationsByStatus: function () {
      return this.celebrations.filter((celebration) => !celebration.status.indexOf(this.status));
    },
  },
  methods: {
    indexCelebrations: function () {
      axios.get("/api/celebrations").then((response) => {
        this.celebrations = response.data;
        console.log(this.celebrations);
      });
    },
    isCompleted: function () {},
    // cabalMatch: function () {
    //   let userId = localStorage.getItem("user_id");
    //   return;
    // },
  },
};
</script>
