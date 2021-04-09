<template>
  <div class="celebration-show">
    <div class="container">
      {{ celebration.name }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      errors: [],
      celebration: {},
    };
  },
  mounted: function () {
    this.showCelebration();
  },
  methods: {
    showCelebration: function () {
      axios.get("api/celebrations/" + this.$route.params.id).then((response) => {
        console.log(response.data);
        this.user = response.data;
      });
    },
  },
};
</script>
