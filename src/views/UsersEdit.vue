<template>
  <div class="users-edit">User Info</div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {}
  },
  methods: {
    updateUser: function () {
      axios.patch("/api/users/" + this.$route.params.id, params)
    }
  }
}