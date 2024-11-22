<template>
  <div class="notification">
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "Notification",
  data() {
    return {
      snackbar: false,
      text: "",
      timeout: 3000,
    };
  },
  created() {
    this.$nuxt.$on("success", (message) => {
      this.text = this.$t(message);
      this.snackbar = true;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/ui/notification";
</style>
